# Node Application Documentation
- This documentation provides an overview and usage instructions for the Node.js application described by the provided code.

- Table of Contents
  - Introduction
  - Installation
  - Configuration
  - Usage
  - API Endpoints
  - Utility Functions

# Introduction

- The Node application is built using the Express.js framework and utilizes the Google APIs for Gmail integration. It provides functionality for authenticating with a user's Gmail account, retrieving the user's email profile, checking for new emails, and sending an auto-reply for received emails.

# Installation

- To install and run the application, follow these steps:
- Ensure that Node.js is installed on your system.
- Clone the repository or download the source code files.
- Open a `terminal` or command prompt and navigate to the project directory.
- Run the following command to install the required dependencies:
  `npm install`

# Configuration

- Before running the application, you need to configure the following environment variables:

```
   ClientID: The client ID obtained from the Google Cloud Console.
   Clientsecret: The client secret obtained from the Google Cloud Console.
   redirectURL: The URL to which the user will be redirected after authentication.
   PORT: (Optional) The port number on which the application will run.
   Defaults to 3000 if not specified.

```

- Create a .env file in the project directory and add the environment variable assignments there. For example:

```
   ClientID=your_client_id
   Clientsecret=your_client_secret
   redirectURL=http://localhost:3000/auth/callback
   PORT=3000

```

# Usage

- To start the application, run the following command:

  ` node app.js`

- Once the application is running, open a web browser and visit `http://localhost:3000/` to initiate the authentication process.

# API Endpoints

- The application exposes the following API endpoints:

- GET /: Initiates the authentication process by redirecting the user to the Google authorization page.
- GET /auth/callback: Callback URL to handle the authorization code returned by Google. Retrieves access and refresh tokens, sets credentials, and retrieves the user's email profile. Also checks for new emails and sends an auto-reply if no prior replies exist.

# Utility Functions

- The application includes the following utility functions:
- checkNewEmails: Retrieves a list of new emails from the user's Gmail account and processes each email to determine if it requires an auto-reply. If an auto-reply is needed, it calls the sendAutoReply function.
- sendAutoReply: Sends an auto-reply email to the specified email address. The reply email contains a predefined subject and message.
- decrypteMessage: Formats the email information into a MIME-encoded message suitable for sending via the Gmail API.
- getRandomInterval: Generates a random interval between a given minimum and maximum value.
- Please note that some code sections have been commented out, which you can uncomment and modify as needed to meet your requirements.
