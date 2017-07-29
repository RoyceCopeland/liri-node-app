//LIRIbot.js


//   * [Twitter](https://www.npmjs.com/package/twitter)
//   * [Spotify](https://www.npmjs.com/package/spotify)
//   * [Request](https://www.npmjs.com/package/request)
//     * You’ll use Request to grab data from the [OMDB API](http://www.omdbapi.com).

// (http://www.omdbapi.com).

"use strict"


var fs = require("fs");
var Twitter = require("twitter");
//var Spotify = require("spotify");
var Request = require("request");
var SpotifyWebApi = require("spotify-web-api-node");
//var movie = require("node-movie");
var movieInfo = require('movie-info');

var keys = require("./keys");
var twitterKeys = keys.twitterKeys;
var spotifyKeys = keys.spotifyKeys;



var action = process.argv[2];
var detail = process.argv[3];

  
switch (action) {
  case "get-tweets":
    getTweets();
    break;

  case "spotify":
    spotifyThis();
    break;

  case "movify":
    movify();
    break;

}

function getTweets(){


  var client = new Twitter({
  consumer_key: twitterKeys.consumer_key,
  consumer_secret: twitterKeys.consumer_secret,
  access_token_key: twitterKeys.access_token_key,
  access_token_secret: twitterKeys.access_token_secret,

});

client.get('search/tweets', {q: 'JRBisMe'}, function(error, tweets, response) {
   //console.log(tweets.statuses);

  for (var index = 0; index < tweets.statuses.length; index++) {
      var tweetText= tweets.statuses[index].text;
      var tweetTime = tweets.statuses[index].created_at;
      console.log('=============================');
      console.log(tweetText);
      console.log(tweetTime);
  }
});

};


// Spotify search using song title removed from homework assignment

}  

function movify(){

    var movie = process.argv[3];
    if(!movie){
			movie = "mr nobody";
		}

movieInfo(movie, function (err, res) {
    console.log("Title: " + res.title);
    console.log("Synopsis: " + res.overview);
    console.log("Release date: " + res.release_date);
    console.log("Movie id: " + res.id);
    console.log("Movie poster image: " + res.poster_path);
    
});

}