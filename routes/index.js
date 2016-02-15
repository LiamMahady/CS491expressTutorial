var express = require('express');
var router = express.Router();

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
    logAccess('post',res);
});

/* GET home page. */
router.get('/', function(req, res, next) {
    logAccess('get',res);
  //res.render('index', { title: 'Express' });
});

module.exports = router;
