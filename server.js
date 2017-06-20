// Initialize Express app
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var exphbs = require('express-handlebars');

// Require request and cheerio. This makes the scraping possible
var request = require('request');
var cheerio = require('cheerio');

// Database configuration
var mongojs = require('mongojs');
var databaseUrl = "scraper";
var collections = ["scrapedData"];

// Hook mongojs configuration to the db variable
var db = mongojs(databaseUrl, collections);
db.on('error', function(err) {
  console.log('Database Error:', err);
});


// Main route (simple Hello World Message)
app.get('/', function(req, res) {
  res.send(index.html);
});

// Route 1 
// This route will retrieve all of the data 
// from the scrapedData collection as a json (this will be populated
// by the data you scrape using the next route)
app.get('/all', function(req, res) {
	// console.log(results);
});


// Route 2   
// When you visit this route, the server will
// scrape data from the site of your choice, and save it to
// MongoDB.
// Note: Think back to how you pushed website data  
// into an empty array in the last class. 
app.get('/scrape', function(req, res) {

request('https://www.nytimes.com/', function(err, body){

// console.log(body);

var $ = cheerio.load(body);

$('p.title').each(function(i, element){
	var title = $(this).text();
	console.log(title);
	var link = $(this).children().attr('href');

	results.push({      
		title: title,
		link: link
		});
	});

res.send("oufrd");

});

// 	request('http://www.huffingtonpost.com/news/pets/', function (error, response, body) {
//   if (!error && response.statusCode == 200) {
//     console.log(body) // Show the URL for Huff Post news about pet stories. 
//   }
// })	
});

// listen on port 3000
app.listen(3000, function() {
  console.log('App running on port 3000!');
});