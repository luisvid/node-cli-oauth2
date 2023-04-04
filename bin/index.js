#!/usr/bin/env node

const yargs = require( "yargs" );
const axios = require( "axios" );

const chalk = require( "chalk" );
const boxen = require( "boxen" );
const boxenOptions = {
  padding: 1,
  margin: 0,
  borderStyle: "round",
  borderColor: "green",
};
const errBoxenOptions = {
  padding: 1,
  margin: 0,
  borderStyle: "double",
  borderColor: "red",
};

const options = yargs
  .usage( "Usage: -n <name>" )
  .option( "n", {
    alias: "name",
    describe: "Your name",
    type: "string",
    demandOption: true,
  } )
  .option( "s", {
    alias: "search",
    describe: "Search term",
    type: "string",
  } ).argv;

const greeting = boxen( chalk.bold( `Hello, ${options.name}!` ), boxenOptions );
console.log( greeting );

console.log( "Here's a cat fact for you:" );


// get axios to fetch the cat facts
axios.get( "https://cat-fact.herokuapp.com/facts" )
  .then( function ( res ) {
    // handle success
    res.data.forEach( ( cat ) => {
      console.log( chalk.bold( "\n" + cat.text ) );
    } );
    if ( res.data.length === 0 ) {
      console.log( boxen( chalk.red( "no cats found :'(" ), errBoxenOptions ) );
    }
  } )
  .catch( function ( error ) {
    // handle error
    console.log( error );
  } );