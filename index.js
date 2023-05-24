const express = require("express");
const { google } = require("googleapis");
require("dotenv").config();
const app = express();
const port = process.env.PORT || 3000;

const SCOPES = [
  "https://www.googleapis.com/auth/gmail.modify",
  "https://www.googleapis.com/auth/gmail.readonly",
  "https://www.googleapis.com/auth/gmail.send",
  "https://www.googleapis.com/auth/gmail.labels",
  "https://mail.google.com/",
];
//  auth clinent setup
const oauth2Client = new google.auth.OAuth2(
  process.env.ClientID,
  process.env.Clientsecret,
  process.env.redirectURL
);

app.get("/", async (req, res) => {
  const authUrl = oauth2Client.generateAuthUrl({
    access_type: "offline",
    scope: SCOPES,
  });
  // console.log(authUrl);
  res.redirect(authUrl);
});

app.get("/auth/callback", async (req, res) => {
  // authorization code
  const code = req.query.code;
  // console.log({code})
  try {
    // access and refresh tokens
    const { tokens } = await oauth2Client.getToken(code);
    console.log({ tokens });
    // Setting the credentials
    oauth2Client.setCredentials(tokens);
    // Gmail API client
    const gmail = google.gmail({ version: "v1", auth: oauth2Client });
    console.log({ gmail });
    // Retrieve email address
    const profile = await gmail.users.getProfile({ userId: "me" });
    console.log({ profile });

    // check new email 


      setInterval(() => {
          const checkNewEmails = async () => {
              const res = await gmail.users.messages.list({ userId: "me" });
              const emails = res.data.messages || [];

              for (const email of emails) {
                  const msg = await gmail.users.messages.get({ userId: "me", id: email.id });
                  const headers = msg.data.payload.headers;
                  const from = headers.find((header) => header.name === "From").value;
                  const replies = headers.filter(
                      (header) => header.name === "In-Reply-To" || header.name === "References"
                  );
                //   console.log(msg)
                  const hasPriorReplies = replies.length > 0;
                  //!    this code will start sending email to unread emails 
                  // if (!hasPriorReplies) {
                  //     await sendAutoReply({ from });
                  // }
              }
          };
      },getRandomInterval(45,120)*1000)
      
    //   calling checkin
    checkNewEmails();

    res.send(`<h1>email address :${profile.data.emailAddress} </h1>
    <h1>Total messages:${profile.data.messagesTotal} </h1>
    <h1>Total Threads: ${profile.data.threadsTotal}</h1>`);

    
  } catch (error) {
    console.error("Error retrieving access token:", error);
    res.status(500).send("Error retrieving access token.");
  }
});

const sendAutoReply = async (email) => {
    const reply = {
        to: email.from,
        subject: "Auto Reply",
        text: `Thank you for your email. I'm currently on vacation but will respond to you as soon as I can.`,
    };

    await gmail.users.messages.send({
        userId: "me",
        requestBody: {
            raw: decrypteMessage(reply),
            labelIds: ["vacation"],
        },
    });
};




app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
