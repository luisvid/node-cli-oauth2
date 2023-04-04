#!/usr/bin/env node
"use strict";

const chalk = require( "chalk" );
const dotenv = require( "dotenv" );
const authClient = require( "../src/authClientPKCE" );
const boxen = require( "boxen" );
const boxenOptions = {
  padding: 1,
  margin: 0,
  borderStyle: "round",
  borderColor: "green",
};

/**
 * 
 *  Authorization Code Grant with PKCE Flow
 * 
 */


dotenv.config();

const config = {
  oauthServerUrl: process.env.OAUTH_SERVER_URL,
  oauthAccessTokenUrl: process.env.OAUTH_ACCESS_TOKEN_URL,
  clientId: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  scopes: process.env.SCOPES,
  redirectUri: process.env.REDIRECT_URI,
  grantType: "authorization_code",
  responseType: process.env.RESPONSE_TYPE,
  userProfileUrl: process.env.OAUTH_USER_PROFILE_URL,
};

const main = async () => {
  try {
    const auth = authClient( config );
    const { token, userInfo } = await auth.executeAuthFlow();
    console.log( chalk.bold( "\ntoken\n\n" ), token );
    console.log( chalk.bold( "\nuserInfo\n\n" ), userInfo );
    console.log( boxen( chalk.bold( "You have successfully authenticated your CLI application!" ), boxenOptions ) );
  } catch ( err ) {
    console.log( chalk.red( err ) );
  }
};

main();