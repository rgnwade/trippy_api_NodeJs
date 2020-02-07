'use strict';

var response = require('./res');
var connection = require('./conn');
var jwt = require('jsonwebtoken');
var moment = require('moment');
var md5 = require('MD5');
var nodemailer = require("nodemailer");

exports.loginUser=function(req,res){
    var email=req.body.email;
    var password =req.body.password;
    
    connection.query('SELECT * FROM users WHERE email = ?',[email], function (error, results, fields) {
      if (error) {
          res.json({
            status:false,
            message:'there are some error with query'
            })
      }else{
        if(results.length >0){
            if(md5(password)==results[0].password){
                var token=jwt.sign(results[0],process.env.SECRET_KEY,{
                    expiresIn:5000
                });
                res.json({
                    status:true,
                    token:token
                })
            }else{
                res.json({
                  status:false,                  
                  message:"Email and password does not match"
                 });
            }
         
        }
        else{
          res.json({
              status:false,
            message:"Email does not exits"
          });
        }
      }
    });
}

var nodemailer = require("nodemailer");
var smtpTransport = nodemailer.createTransport({
  service:'Zoho',
  host: 'smtp.zoho.com',
  port: 465,
  secure: true, // true for 465, false for other ports
  auth: {
      user: "hi@redshift.co.id", 
      pass: "4maret1993" 
  }
});
var rand,mailOptions,host,link;


// Endpoint Get Data 
exports.users = function(req, res) {
    connection.query('SELECT * FROM users', function (error, rows, fields){
        if(error){
            console.log(error)
        } else{
            response.ok(rows, res)
        }
    });
};

exports.admin = function(req, res) {
    connection.query('SELECT * FROM admin', function (error, rows, fields){
        if(error){
            console.log(error)
        } else{
            response.ok(rows, res)
        }
    });
};

exports.roles = function(req, res) {
    connection.query('SELECT * FROM role', function (error, rows, fields){
        if(error){
            console.log(error)
        } else{
            response.ok(rows, res)
        }
    });
};

exports.articles = function(req, res) {
    connection.query('SELECT * FROM article', function (error, rows, fields){
        if(error){
            console.log(error)
        } else{
            response.ok(rows, res)
        }
    });
};

exports.category = function(req, res) {
    connection.query('SELECT * FROM category', function (error, rows, fields){
        if(error){
            console.log(error)
        } else{
            response.ok(rows, res)
        }
    });
};

exports.sub_category = function(req, res) {
    connection.query('SELECT * FROM sub_category', function (error, rows, fields){
        if(error){
            console.log(error)
        } else{
            response.ok(rows, res)
        }
    });
};

exports.comments = function(req, res) {
    connection.query('SELECT * FROM comments', function (error, rows, fields){
        if(error){
            console.log(error)
        } else{
            response.ok(rows, res)
        }
    });
};

exports.service_provider = function(req, res) {
    connection.query('SELECT * FROM service_provider', function (error, rows, fields){
        if(error){
            console.log(error)
        } else{
            response.ok(rows, res)
        }
    });
};

exports.subscribe = function(req, res) {
    connection.query('SELECT * FROM subscribe', function (error, rows, fields){
        if(error){
            console.log(error)
        } else{
            response.ok(rows, res)
        }
    });
};

exports.index = function(req, res) {
    response.ok("Hello from the Node JS RESTful side!", res)
};


//Endpoint Search Data

exports.findUsers = function(req, res) {
    
    var user_id = req.params.user_id;

    connection.query('SELECT * FROM users where id = ?',
    [ user_id ], 
    function (error, rows, fields){
        if(error){
            console.log(error)
        } else{
            response.ok(rows, res)
        }
    });
};



//Endpoint Create Data
exports.createUsers = function(req, res) {
    
    var email = req.body.email;
    var name = req.body.name;
    var country_id = req.body.country_id;
    var password = md5(req.body.password);
    var last_update = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss');
    var date_create = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss');

    rand = Math.floor((Math.random() * 100) + 54);
    host = req.get('host');
    link = "http://"+req.get('host')+"/verify?id="+rand;

    connection.query('INSERT INTO users (email, password, name, country_id, last_update, date_create) values (?,?,?,?,?,?)',
    [email, password, name, country_id, last_update, date_create], 
        function (error,rows,email){
            if(error){
                console.log(error)
            } else{
                mailOptions = {
                    to : req.body.email,
                    subject : "Please confirm your Email account",
                    html : "Hello,<br> Please Click on the link to verify your email.<br><a href="+link+">Click here to verify</a>"
                }
                console.log(mailOptions);
                smtpTransport.sendMail(mailOptions, (error, response) => {
                 if(error){
                        console.log(error);
                 }else{
                        console.log("Message sent: " + response.message);
                        response.ok("Berhasil menambahkan user!", rows, res)
                     }
            });

              
            }
        });
 
    };


//Endpoint Update Data

exports.updateUsers = function(req, res) {
    
    var user_id = req.body.user_id;
    var first_name = req.body.first_name;
    var last_name = req.body.last_name;

    connection.query('UPDATE users SET first_name = ?, last_name = ? WHERE id = ?',
    [ first_name, last_name, user_id ], 
    function (error, rows, fields){
        if(error){
            console.log(error)
        } else{
            response.ok("Berhasil merubah user!", res)
        }
    });
};



//Endpoint Delete Data

exports.deleteUsers = function(req, res) {
    
    var user_id = req.body.user_id;

    connection.query('DELETE FROM users WHERE id = ?',
    [ user_id ], 
    function (error, rows, fields){
        if(error){
            console.log(error)
        } else{
            response.ok("Berhasil menghapus user!", res)
        }
    });
};