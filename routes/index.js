var express = require('express');
var bodyParser=require('body-parser');
var router = express.Router();

express().use(bodyParser.urlencoded({extended:true}));

var Sequelize=require('sequelize');
var sequelize=new Sequelize('learnproj', 'learnproj', 'learning project confusion', {
    host: 'localhost',
     dialect: 'mysql',
    pool:{
	max:5,
	min:0,
	idle:10000
    }
 });

var Access=sequelize.define('access',{
    type: Sequelize.ENUM('get','post')/*,
    classMethods:{
	logAccess: function(accessType){
	    Access.create({type:accessType});
	    var */
});
Access.sync();

var BoardPost=sequelize.define('boardPost',{
    message:Sequelize.STRING(2048)});
BoardPost.sync();

function displayPosts(res){
    BoardPost.findAll().then(function(boardPosts){
	var html="<html><body><ul>";
	for (i in boardPosts){
	    html+="<li>Anonymous posted on "+boardPosts[i].createdAt+":<p>"+boardPosts[i].message+"</p></li>";
	}
	html+="</ul><form method=\"post\">Make a post:<br><input type=\"text\" name=\"message\"><input type=\"submit\" value=\"Submit\"></form></body></html>";
	res.send(html);});
}
	

function logAccess(accessType,res){
    Access.create({type:accessType}).then(function(){
var html="<html><body><ul>";
    Access.findAll().then(function(accesses){
	for (i in accesses){
	    //console.log(access);
	    html+="<li>Got a "+accesses[i].type+" request at "+accesses[i].createdAt+"</li>";
	}
	html+="</ul></body></html>";
	res.send(html);
    });});
}
			  

/*tutorial nonsense*/
router.post('/',function(req,res){
    //logAccess('post',res);
    BoardPost.create({message:req.body.message}).then(function(){
	displayPosts(res);});
});

/* GET home page. */
router.get('/', function(req, res, next) {
    //logAccess('get',res);
    //res.render('index', { title: 'Express' });
    displayPosts(res);
});

module.exports = router;
