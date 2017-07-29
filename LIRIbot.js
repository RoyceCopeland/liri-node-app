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


// Spotify search using song title
function spotifyThis() {

		var song = process.argv[3];


  var spotifyApi = new SpotifyWebApi({
    client_id: spotifyKeys.client_id,
    client_secret: spotifyKeys.client_secret,
  });

// Retrieve an access token
spotifyApi.clientCredentialsGrant()
  .then(function(data) {
    console.log('The access token expires in ' + data.body['expires_in']);
    console.log('The access token is ' + data.body['access_token']);

    // Save the access token so that it's used in future calls
    spotifyApi.setAccessToken(data.body['access_token']);
  }, function(err) {
    console.log('Something went wrong when retrieving an access token', err.message);
  });

  
 





//spotifyApi.searchTracks('Love', function(err, data) {
//  if (err) {
//    console.error('Something went wrong', err.message);
//    return;
//  }
//
//  // Print some information about the results
//  console.log('I got ' + data.body.tracks.total + ' results!');
//
//  // Go through the first page of results
//  var firstPage = data.body.tracks.items;
//  console.log('The tracks in the first page are.. (popularity in parentheses)');
//
//  /*
//   * 0: All of Me (97)
//   * 1: My Love (91)
//   * 2: I Love This Life (78)
//   * ...
//   */
//  firstPage.forEach(function(track, index) {
//    console.log(index + ': ' + track.name + ' (' + track.popularity + ')');
//  });
//});
  










///  var song = new Spotify({
///  client_id: spotifyKeys.client_id,
///  client_secret: spotifyKeys.client_secret,
///
///});
///  song.search({ type: "track", query: "title"}, function(err, data) {
///    if ( err ) {
///        console.log('Error occurred: ' + err);
///        return;  //from spotify npm docs
///    }
///    else{
///    var songInfo = data.tracks.items[0];
///    var songResult = console.log(songInfo.artists[0].name)
///                     console.log(songInfo.name)
///                     console.log(songInfo.album.name)
///                     console.log(songInfo.preview_url)
///    console.log(songResult);
///    };
///  });
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