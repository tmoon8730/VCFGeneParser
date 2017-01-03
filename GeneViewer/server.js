var express = require('express');
var app = express()
app.set('view engine', 'pug');
var router = express.Router();
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended:true}));
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
		res.render('index', {title:'Hey', message: 'Hello there!', geneId: 'n/a', chrom: 'n/a', pos: 'n/a'});
	});
});

app.post('/', function(req, res){
	console.log(req.body.gene_id);
	Gene.findOne({gene_id: req.body.gene_id}, function(err, gene){
		if(err){
			res.render('index', {title:'Hey', message: "Did not find a Gene for " + req.body.gene_id, geneId: 'n/a', chrom: 'n/a', pos: 'n/a'});
		}
		console.log("found id %s", gene.gene_id);
		res.render('index', {title:'Hey', message: "Found a Gene for " + gene.gene_id, geneId: gene.gene_id, chrom: gene.chrom, pos: gene.pos});
	})
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
