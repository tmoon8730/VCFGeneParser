var express = require('express');
var app = express()
var router = express.Router();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var url = 'mongodb://localhost:27017/gene_database';
var assert = require('assert');

app.set('view engine', 'pug');
app.use(bodyParser.urlencoded({extended:true}));

var Schema = mongoose.Schema, ObjectID = Schema.ObjectID;

var Gene = new Schema({
	gene_id: String,
	pos: String,
	chrom: String,
	ref: String,
	alt: [String],
},{collection: 'gene_collection'})

var Gene = mongoose.model('Gene', Gene);

mongoose.connect(url, function(err){
	assert.equal(err,null);
	console.log('connected to mongodb');
});

app.get('/', function(req, res){
	res.render('index', {title:'Hey', message: 'Hello there!',
	geneId: 'n/a', chrom: 'n/a', pos: 'n/a', ref: 'n/a', alt: ['n/a','n/a']});
});

app.post('/', function(req, res){
	console.log(req.body.gene_id);
	Gene.findOne({gene_id: req.body.gene_id}, function(err, gene){
		if(gene != null){
			if(err){
				res.render('index', {title:'Hey', message: "Error finding a Gene for " + req.body.gene_id, geneId: 'n/a', chrom: 'n/a', pos: 'n/a'});
				console.log(err);
			}
			console.log("found id %s", gene.gene_id);
			res.render('index', {title:'Hey', message: "Found a Gene for " + gene.gene_id,
			geneId: gene.gene_id, chrom: gene.chrom, pos: gene.pos, ref: gene.ref, alt: gene.alt});
		}else{
			res.render('index', {title:'Hey', message: 'Could not find a gene for ' + req.body.gene_id,
			geneId: 'n/a', chrom: 'n/a', pos: 'n/a', ref: 'n/a', alt: ['n/a','n/a']});
		}
	})
});



app.listen(8888, function(){
	// Console will print a message
	console.log('Server running at http://127.0.0.1:8888/');
});
