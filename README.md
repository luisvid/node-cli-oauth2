# OAuth in Node.js CLI Apps

This project is the sample CLI application code for the blog post [Build a Command Line Application with Node.js](https://developer.okta.com/blog/2019/06/18/command-line-app-with-nodejs). 

> This sample app demonstrates using Node.js to build a CLI application that can authenticate with an OAuth 2.0 API.

> About OAuth 2.0 grant flows: [Which OAuth 2.0 grant should I implement?](https://oauth2.thephpleague.com/authorization-server/which-grant/)

### To test it:

1. Run `npm install` from the command line in the project folder.
2. Run the [OAuth2 Server proyect](https://github.com/luisvid/node-express-oauth2-server)
3. Install the CLI app globally using `npm install -g .`
    
    After installing the CLI app globally, you will have the commands: 
    - `hello`: a test command that greet and retrieve info from a random API
    - `code-login`: Authorization Code Grant Flow
    - `pkce-login`: Authorization Code Grant with PKCE Flow
    - `credentials-login`: Client Credentials Grant Flow


4. If everything goes well, the console will log the token, the user info and the message: **You have successfully authenticated your CLI application!**


Enjoy!
