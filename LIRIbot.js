//LIRIbot.js


//   * [Twitter](https://www.npmjs.com/package/twitter)
//   * [Spotify](https://www.npmjs.com/package/spotify)
//   * [Request](https://www.npmjs.com/package/request)
//     * You’ll use Request to grab data from the [OMDB API](http://www.omdbapi.com).

// (http://www.omdbapi.com).

"use strict"


var fs = require("fs");
var Twitter = require("twitter");
var Spotify = require("spotify");
var Request = require("request");

var keys = require("./keys");
var twitterKeys = keys.twitterKeys;



var action = process.argv[3];
  
switch (action) {
  case "get tweets":
    getTweets();
    break;

  case "Spotify 'song title'":
    spotify();
    break;

  case "Movify 'movie title'":
    withdraw();
    break;

}


var client = new Twitter({
  consumer_key: twitterKeys.consumer_key,
  consumer_secret: twitterKeys.consumer_secret,
  access_token_key: twitterKeys.access_token_key,
  access_token_secret: twitterKeys.access_token_secret,

});

client.get('search/tweets', {q: 'JRBisMe'}, function(error, tweets, response) {
   console.log(tweets.statuses);

  for (var index = 0; index < tweets.statuses.length; index++) {
      var tweetText= tweets.statuses[index].text;
      var tweetTime = tweets.statuses[index].created_at;
      console.log('=============================');
      console.log(tweetText);
      console.log(tweetTime);
  }
});


// Spotify search using song title



spotify.search({ type: 'track', query: 'dancing in the dark' }, function(err, data) {
    if ( err ) {
        console.log('Error occurred: ' + err);
        return;
    }
 
    console.log(data);
});