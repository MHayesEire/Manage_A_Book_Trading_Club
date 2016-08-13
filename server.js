//Build a Book Trading Club
//FCC API Basejump: Build a Book Trading Club
//04.08.2016
'use strict';

var mongo = require('./mydatabaseconn.js');

var ejs = require('ejs');

var express = require('express');

var routes = require('./routes');

var app = express();

var server = require('http').createServer(app);

var morgan = require('morgan');
var bodyParser = require('body-parser');

app.set('view engine', 'ejs');

////////////

app.use(morgan('dev')); // logger
var cookieParser = require('cookie-parser');
var session = require('express-session');
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true })); 
app.use(bodyParser.json()); 
app.use('/', express.static(process.cwd() + '/')); 
      
var port = process.env.PORT || 8080;

var secret = process.env.SECRET || 'nodejsappbookclubmartin';

//app.use(session({ secret: secret }));

app.use(session({
  secret: secret,
  resave: false,
  saveUninitialized: true
}));

app.get('/', routes.index);
app.get('/signup', routes.signup);
app.post('/signup', routes.signupData);
app.get('/login', routes.login);
app.post('/loginForm', routes.loginForm);
app.get('/books', isLoggedIn, routes.books);
app.get('/acSettings', isLoggedIn, routes.acSettings);
app.post('/updateAC', isLoggedIn, routes.updateAC);
app.get('/logout', routes.logout);
app.post('/ACpwUpdate', isLoggedIn, routes.ACpwUpdate);
app.get('/mybooks', isLoggedIn, routes.mybooks);
app.post('/booksearchForm', isLoggedIn, routes.booksearchForm);
app.post('/addbook', isLoggedIn, routes.addbook);
app.get('/wishlists', isLoggedIn, routes.wishlists);
app.post('/wishlistAdd', isLoggedIn, routes.wishlistAdd);
app.post('/delwish', isLoggedIn, routes.delwish);
app.post('/delmybook', isLoggedIn, routes.delmybook);
app.post('/deltrade', isLoggedIn, routes.deltrade);
app.post('/accepttrade', isLoggedIn, routes.accepttrade);
app.post('/acceptbook', isLoggedIn, routes.acceptbook);


mongo.init(function (error) {
    if (error)
        throw error;

    app.listen(port,  function () 
{
	
console.log('Node.js ... HERE ... listening on port ' + port + '...');

});
});

// make sure user is logged in
function isLoggedIn (req, res, next) {
  if (!(req.session && req.session.user)) {
   // return res.send('Not logged in!');
   res.redirect('/');
  }
  next();
}

//////