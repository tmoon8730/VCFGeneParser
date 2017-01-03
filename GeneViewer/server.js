var express = require('express');
var app = express()
app.set('view engine', 'pug');
var router = express.Router();
/* Set up the MongoDB Database connection */
var mongoose = require('mongoose');
var url = 'mongodb://localhost:27017/gene_database';
var assert = require('assert');

mongoose.connect(url, function(err){
	assert.equal(err,null);
	console.log('connected to mongodb');
});

var Schema = mongoose.Schema, ObjectID = Schema.ObjectID;

var Gene = new Schema({
	gene_id: String,
	pos: String,
	chrom: String,
},{collection: 'gene_collection'})

var Gene = mongoose.model('Gene', Gene);

app.get('/', function(req, res){
	Gene.find({}, function(err, docs){
		console.log('Docs = ' + JSON.stringify(docs))
		res.render('index', {title:'Hey', message: 'Hello there!', docs: docs});
	});
});
app.get('/:gene_id', function(req, res){
	res.render('index', {title:'DIFF', message:'You entered: ' + req.params.gene_id, docs: {"gene_id":req.params.gene_id}});
});

app.post('/signup', function(req, res){
	console.log(req.body.title);
	console.log(req.body.description);
	res.send('Post page');
});
/*var MongoClient = require('mongodb').MongoClient;

var ObjectID = require('mongodb').ObjectID;


var findGenes = function(db, callback){
	var cursor = db.collection('gene_collection').find();
	cursor.each(function(err, doc){
		assert.equal(err,null);
		if(doc != null){
			console.dir(doc);
		} else {
			callback();
		}
	});
};

MongoClient.connect(url, function(err, db){
	assert.equal(null, err);
	findGenes(db, function() {
		db.close();
	});
});*/

/* Create an HTTP server to handle responses */
//http.createServer(function(request, response) {
//	response.writeHead(200, {"Content-Type": "text/plain"});
//	response.write("Hello World");
//	response.end();
//}).listen(8888);

app.listen(8888, function(){
	// Console will print a message
	console.log('Server running at http://127.0.0.1:8888/');
});
