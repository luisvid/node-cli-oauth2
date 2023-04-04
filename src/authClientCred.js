"use strict";

const axios = require( "axios" );
const querystring = require( "querystring" );

module.exports = ( {
  oauthServerUrl,
  oauthAccessTokenUrl,
  clientId,
  clientSecret,
  scopes,
  redirectUri,
  grantType,
  responseType,
  userProfileUrl,
} ) => {
  if (
    !oauthServerUrl ||
    !oauthAccessTokenUrl ||
    !clientId ||
    !clientSecret ||
    !scopes ||
    !redirectUri ||
    !grantType ||
    !responseType ||
    !userProfileUrl
  ) {
    throw new Error(
      "auth URL, client ID, scopes, and server port are required."
    );
  }

  const getUserInfo = async ( accessToken ) => {
    try {
      const config = {
        headers: { Authorization: `Bearer ${accessToken}` },
      };
      const url = userProfileUrl;
      const res = await axios.get( url, config );
      return res.data;
    } catch ( err ) {
      console.log( "error getting user info", err ); // eslint-disable-line no-console
      throw err;
    }
  };

  const getToken = async () => {
    try {
      const request = {
        grant_type: grantType,
        scope: scopes,
        client_id: clientId,
        client_secret: clientSecret
      };
      const url = oauthAccessTokenUrl;
      const data = querystring.stringify( request );
      const res = await axios.post( url, data );
      return res.data;
    } catch ( err ) {
      console.log( "error getting token", err ); // eslint-disable-line no-console
      throw err;
    }
  };

  // Start server and begin auth flow
  // Clients in the Client Credentials flow exchange 
  // client credentials for access token with the token function
  const executeAuthFlow = () => {
    return new Promise( async ( resolve, reject ) => {
      
      try {
        const token = await getToken(  );
        const userInfo = await getUserInfo( token.access_token );
        resolve( { token, userInfo } );
      } catch (err) {
        reject( err );
      }

    } );
  };

  return {
    executeAuthFlow,
  };
};
