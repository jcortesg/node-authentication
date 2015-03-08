//set up ==============
// get all package

var express = require('express');
var app     = express();
var port    = process.env.PORT || 8080;
var mongoose= require('mongoose');
var passport= require('passport');
var flash    = require('connect-flash');
var path = require('path');


var morgan  = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
var session      = require('express-session');

var configDB = require('./config/database.js');

//configuration =======

require('./config/passport')(passport);

// set up our express application
app.use(morgan('dev')); 
app.use(cookieParser());
app.use(bodyParser());

app.set('views', path.join(__dirname, 'app/views'));
app.set('view engine', 'jade');

// init passport
app.use(session({ secret: 'SecretKey'  }));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash()); 

// routes =========================================
require('./app/routes.js')(app, passport);

// development error handler
if (app.get('env') === 'development') {
    mongoose.connect(configDB.url,function(err,res){
        if(err) console.log("no se conecto");
        console.log("Db conectada");
    });

    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
             message: err.message,
            error: err
        })
    })
}

// production error handler
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
         error: {}
    });
})
// launch

app.listen(port);
console.log('The magic happens on port ' + port);
