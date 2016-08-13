/// index.js routes
    
//var db = app.settings.db;
var mongo = require('../mydatabaseconn.js');
var ObjectId = require('mongodb').ObjectID;
var validator = require("email-validator");

var bcrypt = require('bcrypt');
var salt = bcrypt.genSaltSync(10);

 var books = require('google-books-search');

/*
 * GET home page.
 */

exports.index = function(req, res){
        res.render('pages/index', {
               title: 'Book Trading Club App'
            });
};


////////////////


///////////////// Accept BOOK


exports.acceptbook = function(req, res){
    var db = mongo.client;
    var user1 = req.session.user || 0;
    
    console.log("user is " + user1);
    var user = req.session.user || 0;
    console.log("USER: " + user);

    var bookid = req.body.bookid;    
    var buyer = req.body.buyer;
    var owner = req.body.owner;   
    var book = req.body.book;
    var wish = req.body.wish;
    
    var tagline = "Book Trade Update: ";
    
    var qUserObj = {};
     
       qUserObj = { 
         "wish": "accepted"
       }; 
       if(user1 !=0){
           db.collection('wishes', function(err, collection) {
           if (err) throw err; 
           collection.findOne({ userid: buyer , owner: owner, wish: 'waiting' }, function(err, user) {
        console.log("" + user1 + " " + user1);
            if (err) throw err; 
    if (user) {
        console.log("user exists");
        console.log(user + " " + user1);
        db.collection('wishes').update({ bookid : bookid, userid: buyer },
                        { $set:{ wish: qUserObj.wish } },
                           { upsert: true },
                    function(err, results) {
                    if (err) throw err; 
                    console.log("OK updated..."  + results);
                    ////////////////////
                     /// -------  move book to new ownership.
                    ///////////////////
                    
           db.collection('books', function(err, collection) {
           if (err) throw err; 
           collection.findOne({ userid: owner, book: book }, function(err, user) {
        console.log("" + user1 + " " + user1);
            if (err) throw err; 
    if (user) {
        console.log("user exists");
        console.log(user + " " + user1);
        db.collection('books').update({ book : book, userid: owner },
                        { $set:{ userid: buyer } },
                           { upsert: true },
                    function(err, results) {
                    if (err) throw err; 
                    console.log("OK updated..."  + results);
                    ////////////////////
                     /// ------- delete all requests.
                    ///////////////////
                    
                    db.collection('wishes', function(err, collection) {
           if (err) throw err; 
               collection.remove({ bookid : bookid }, function(err, result) {
            if (err) throw err; 
            ///////////////////
             getBooks(user1,res,db,req, function(result) {
            if(result.length > 0){  
                 res.render('pages/mybooks', {
                                title: 'Book Trading Club App',
                                error: "",
                                books: result
                 });
           
           console.log("result: ");
           console.log(result);
            }
            else if(!result.length){
                console.log("result: ");
                console.log(result);
                 res.render('pages/mybooks', {
                            title: 'Book Trading Club App',
                            error: "None Available.",
                            books: result
                            });
            }         
            else{
             res.render('pages/mybooks', {
                title: 'Book Trading Club App',
                error: "error",
                books: result
            });
            }

    });
            ///////////////////
        });
});
});
    } else {
        
        console.log("user doesn't exist");
        res.redirect('/');
    }
   }); 
});
});
    } else {
        
        console.log("user doesn't exist");
        res.redirect('/');
    }
   }); 
}); 
  }
else{
   getBooks(user1,res,db,req, function(result) {
            if(result.length > 0){  
                 res.render('pages/mybooks', {
                                title: 'Book Trading Club App',
                                error: "",
                                books: result
                 });
           
           console.log("result: ");
           console.log(result);
            }
            else if(!result.length){
                console.log("result: ");
                console.log(result);
                 res.render('pages/mybooks', {
                            title: 'Book Trading Club App',
                            error: "None Available.",
                            books: result
                            });
            }         
            else{
             res.render('pages/mybooks', {
                title: 'Book Trading Club App',
                error: "error",
                books: result
            });
            }

    });
}
    
};

/////////////////


///////////////// Accept Trade


exports.accepttrade = function(req, res){
    var db = mongo.client;
    var user1 = req.session.user || 0;
    
    console.log("user is " + user1);
    var user = req.session.user || 0;
    console.log("USER: " + user);

    var bookid = req.body.bookid;    
    var buyer = req.body.buyer;
    var owner = req.body.owner;    
    var tagline = "Book Trade Update: ";
    
    var qUserObj = {};
     
       qUserObj = { 
         "wish": "waiting"
       }; 
       if(user1 !=0){
           db.collection('wishes', function(err, collection) {
           if (err) throw err; 
          // console.log(collection);
           collection.count({}, function(error, count) {
    console.log('I have '+count+' documents in my collection');
    if (!err && count === 1) {
  console.log('one only ');
  collection.findOne({ userid: buyer , owner: owner }, function(err, user) {
        console.log("" + user1 + " " + user1);
            if (err) throw err; 
    if (user) {
        console.log("user exists");
        console.log(user + " " + user1);
        db.collection('wishes').update({ bookid : bookid, userid: buyer },
                        { $set:{ wish: qUserObj.wish } },
                           { upsert: true },
                    function(err, results) {
                    if (err) throw err; 
                    console.log("OK updated..."  + results);
                    ////////////////////
                    
                    ///////////////////
                   getBooks(user1,res,db,req, function(result) {
            if(result.length > 0){  
                 res.render('pages/mybooks', {
                                title: 'Book Trading Club App',
                                error: "",
                                books: result
                 });
           
           console.log("result: ");
           console.log(result);
            }
            else if(!result.length){
                console.log("result: ");
                console.log(result);
                 res.render('pages/mybooks', {
                            title: 'Book Trading Club App',
                            error: "None Available.",
                            books: result
                            });
            }         
            else{
             res.render('pages/mybooks', {
                title: 'Book Trading Club App',
                error: "error",
                books: result
            });
            }

    });
                 
                 
                 
                    });
    } else {
        
        console.log("user doesn't exist");
        res.redirect('/');
    }
    }); 
  
    }
   else if (!err && count > 1) {
  console.log('loads !');
  collection.update({ 'bookid': bookid, 'wish': true  }, { $set: { 'wish': 'waiting' } }, {upsert: false, multi: true});
    getBooks(user1,res,db,req, function(result) {
            if(result.length > 0){  
                 res.render('pages/mybooks', {
                                title: 'Book Trading Club App',
                                error: "",
                                books: result
                 });
           
           console.log("result: ");
           console.log(result);
            }
            else if(!result.length){
                console.log("result: ");
                console.log(result);
                 res.render('pages/mybooks', {
                            title: 'Book Trading Club App',
                            error: "None Available.",
                            books: result
                            });
            }         
            else{
             res.render('pages/mybooks', {
                title: 'Book Trading Club App',
                error: "error",
                books: result
            });
            }

    });
    }else {
        
        console.log("user doesn't exist");
        res.redirect('/');
    }  
    
});
           
           
           
           
    }); 
  }
else{
   console.log("not logged in");
   res.redirect('/');
}
    
};

/////////////////


//////////////// Delete myBook


exports.delmybook = function(req, res){
    var db = mongo.client;
     var user1 = req.session.user || 0; 
     console.log("user is : " + user1);
     //var book = req.body.book;
     var bookid = req.body.bookid;
     
     var query = {bookid};
     if(user1 != 0){
        delMyBook( query, db, function(deleteBook) {
             
             ////
             
          if(deleteBook.length > 0){  
                 res.render('pages/mybooks', {
                                title: 'Book Trading Club App',
                                error: "Humm...",
                                books: deleteBook
                 });
           
           console.log("result: ");
           console.log(deleteBook);
            }
            else if(!deleteBook.length){
                console.log("result: ");
                console.log(deleteBook);
                 res.render('pages/mybooks', {
                            title: 'Book Trading Club App',
                            error: "Ok, Removed.",
                            books: deleteBook
                            });
            }         
            else{
             res.render('pages/mybooks', {
                title: 'Book Trading Club App',
                error: "error",
                books: deleteBook
            });
            }
             
             /////
    });
     }else{
         res.redirect('/'); 
     }        
};

////////////////


//////////////// Delete wish


exports.delwish = function(req, res){
    var db = mongo.client;
     var user1 = req.session.user || 0; 
     console.log("user is : " + user1);
     var book = req.body.book;
     var bookid = req.body.bookid;
     var userid = req.body.userid;
     var id = req.body.id;
     var owner = req.body.owner;     
     
     var query = { bookid , userid, id, owner };
     if(user1 != 0){
        delWish( query, db, function(docs) {
             
             ////
             getAllBooks(res,db, function(result) {
                console.log("result: ");
                console.log(result);
                var error = "removed.";
                 /////
                getWishes(req, db, res, user1, result, error);
                /////
    });
          
             
             /////
    });
     }else{
         res.redirect('/'); 
     }        
};

////////////////

//////////////// Delete Trade


exports.deltrade = function(req, res){
    var db = mongo.client;
     var user1 = req.session.user || 0; 
     console.log("user is : " + user1);
     var book = req.body.book;
     var bookid = req.body.bookid;
     var userid = req.body.buyer;
     var owner = req.body.owner;     
     var wish = req.body.wish;
     var id = req.body.id;     
     var query = {bookid, userid, wish, owner, id };
     
     if(user1 != 0){
        delTrade( query, db, function(docs) {
             
             ////
             getAllBooks(res,db, function(result) {
                console.log("result: ");
                console.log(result);
                var error = "removed.";
                 /////
                getWishes(req, db, res, user1, result, error);
                /////
    });
          
             
             /////
    });
     }else{
         res.redirect('/'); 
     }        
};

////////////////


////////////////

// Wishlist 

exports.wishlists = function(req, res){
    var db = mongo.client;
    var user1 = req.session.user || 0;
    if(user1 != 0 ){
        db.collection('wishes',function(err,wishlists){
            if (err) throw err; 
            wishlists.find({"userid": req.session.user}).toArray(function(err, items) {
                if (err) throw err; 
            console.log(items);
            res.send(items);
            });
      }) //collection
    
    }else{
      res.redirect('/'); 
    }
};


////////////////

////////////////
// Wishlist Insert

exports.wishlistAdd = function(req, res){
console.log("HERE");
    var db = mongo.client;
    var user1 = req.session.user;
    console.log(req.body.book);
    var book = req.body.book; 
    var owner = req.body.userid; 
    console.log(owner);
    var image = req.body.image;
    console.log(image);
    var bookid = req.body.bookid;
    console.log(bookid);    
if (book !=""){
   /*var bookQuery = { 'user' : user1,
                     'guest': guestUser,
                     'book' : book,
                     'id' : id,
                     'wish' : true
                    };
                    */
   var bookQuery = { 'book' : book,
                     'bookid' : bookid,
                     'wish' : true,
                     'userid': req.session.userid,
                     'owner': owner,
                     'wishcounter': 1
                    };                    
                     
 db.collection('wishes', function(err, collection) {
           if (err) throw err; 
    collection.findOne({ 'userid': req.session.userid, 'bookid': bookid  }, function(err, book) {
    
    if (err) throw err; 
    if (book) {
        console.log("book already exists");
         getAllBooks(res,db, function(result) {
            if(result.length > 0){  
                 /////
                var error = "Book already exists."
                getWishes(req, db, res, user1, result, error );
                /////
           
           console.log("result: ");
           console.log(result);
            } else{
             /////
                 var error = "";
                getWishes(req, db, res, user1, result,error );
                /////
            }
    });
         
    }
    else{
        
        /// check if its their own book ...
        ///////////////////////////////////
        
db.collection('books', function(err, collection) {
           if (err) throw err; 
    collection.findOne({ 'userid': req.session.userid, '_id': new ObjectId(bookid) }, function(err, book) {
    if (err) throw err; 
    if (book) {
     console.log ("It is your own book!");
     getAllBooks(res,db, function(result) {
            if(result.length > 0){
                 /////
                 var error = "It is your own book!";
                getWishes(req, db, res, user1, result,error );
                /////
           
           console.log("result: ");
           console.log(result);
            }
            else if(!result.length){
                console.log("result: ");
                console.log(result);
                 /////
                 var error = "It is your own book!";
                getWishes(req, db, res, user1, result,error );
                /////
            }         
            else{
             /////
             var error = "It is your own book!";
                getWishes(req, db, res, user1, result,error );
                /////
            }
    });
    }
    else{
        
        // insert book
     var squery = db.collection('wishes'); 
        console.log(squery);
        squery.insert(bookQuery, function(err, result1) {
         if (err) throw err; 
            console.log('Saved ');
            console.log( result1); 
            
            //////////////////
            
        getAllBooks(res,db, function(result) {
            if(result.length > 0){
                 /////
                 var error = "";
                getWishes(req, db, res, user1, result,error );
                /////
           
           console.log("result: ");
           console.log(result);
            }
            else if(!result.length){
                console.log("result: ");
                console.log(result);
                 /////
                 var error = "";
                getWishes(req, db, res, user1, result,error );
                /////
            }         
            else{
             /////
             var error = "";
                getWishes(req, db, res, user1, result,error );
                /////
            }
    });
            
});
    }
    }); 
    });     
        
        
        /////////////////////////////
 
    }
    }); 
    }); 
}  else {
        res.render('pages/books', {
               title: 'Book Trading Club App',
               books: "",
               error: "None entered.",
               wishes: ""
            });
    }
};


////////////////


////////////////

exports.books= function(req, res){
 var db = mongo.client;
var user1 = req.session.user;
getAllBooks(res,db, function(result) {
            if(result.length > 0){  
                /////
                var error = "";
                getWishes(req, db, res, user1, result,error );
                /////
                 
           
           console.log("result: ");
           //console.log(result);
            }
            else if(!result.length){
                console.log("result: ");
                console.log(result);
                 /////
                 var error = "";
                getWishes(req, db, res, user1, result,error );
                /////
            }         
            else{
             /////
             var error = "";
                getWishes(req, db, res, user1, result,error );
                /////
            }
    });
};


////////////////


//my books page

////////////////


exports.mybooks= function(req, res){
    var db = mongo.client;
    var user1 = req.session.user || 0;    
    if(user1 !=0 ){
    getBooks(user1,res,db,req, function(result) {
            if(result.length > 0){  
                 res.render('pages/mybooks', {
                                title: 'Book Trading Club App',
                                error: "",
                                books: result
                 });
           
           console.log("result: ");
           console.log(result);
            }
            else if(!result.length){
                console.log("result: ");
                console.log(result);
                 res.render('pages/mybooks', {
                            title: 'Book Trading Club App',
                            error: "None Available.",
                            books: result
                            });
            }         
            else{
             res.render('pages/mybooks', {
                title: 'Book Trading Club App',
                error: "error",
                books: result
            });
            }

    });
}else{
         res.redirect('/'); 
     }     
};

////////////////


// Add Book page

////////////////


exports.addbook = function(req, res){
 console.log("HERE");
    var db = mongo.client;
    var user1 = req.session.user;
    console.log(req.body.book);
    var book = req.body.book; 
    var image = req.body.imagethumb;
    console.log(image);
    var userid = req.session.userid;
if (book !=""){
   var bookQuery = { 'userid' : userid,
                     'book' : book,
                     'image': image};
                     
 db.collection('books', function(err, collection) {
           if (err) throw err; 
    collection.findOne({ 'user': user1, 'book': book  }, function(err, book) { 
    
    if (err) throw err; 
    if (book) { 
        console.log("book already exists");
         res.render('pages/mybooks', {
               title: 'Book Trading Club App',
               books: "",
               error: "Book already exists!"
            });
    }
    else{
        // insert book
     var squery = db.collection('books'); 
        console.log(squery);
        squery.insert(bookQuery, function(err, result1) { 
         if (err) throw err; 
            console.log('Saved ');
            console.log( result1); 
            
            //////////////////
            
                var cursor = db.collection('books').find( { "user": user1 } ).sort({ when: -1 });
                cursor.skip(0);
                
                var result = [];
                
                cursor.each(function(err, item) {
                if(item == null) {
                //db.close();
                // callback(result);
                console.log (result);
                return result;
                }
                console.log(err);
                //console.log(item);
                
                result.push({ title: item["book"], user: item["user"], imagethumb: item["image"] } );
                //console.log(JSON.stringify(result));
                });
                //return result;    
                
                console.log(result);
                getBooks(user1,res,db,req, function(result) {
            if(result.length > 0){  
                 res.render('pages/mybooks', {
                                title: 'Book Trading Club App',
                                error: "",
                                books: result
                 });
           
           console.log("result: ");
           console.log(result);
            }
            else if(!result.length){
                console.log("result: ");
                console.log(result);
                 res.render('pages/mybooks', {
                            title: 'Book Trading Club App',
                            error: "None Available.",
                            books: result
                            });
            }         
            else{
             res.render('pages/mybooks', {
                title: 'Book Trading Club App',
                error: "error",
                books: result
            });
            }

    });
            
            //////////////////
        });
    }
    }); 
    }); 
    getBooks(user1,res,db,req, function(result) {
            if(result.length > 0){  
                 res.render('pages/mybooks', {
                                title: 'Book Trading Club App',
                                error: "",
                                books: result
                 });
           
           console.log("result: ");
           console.log(result);
            }
            else if(!result.length){
                console.log("result: ");
                console.log(result);
                 res.render('pages/mybooks', {
                            title: 'Book Trading Club App',
                            error: "None Available.",
                            books: result
                            });
            }         
            else{
             res.render('pages/mybooks', {
                title: 'Book Trading Club App',
                error: "error",
                books: result
            });
            }

    });
}  else {
        getBooks(user1,res,db,req, function(result) {
            if(result.length > 0){  
                 res.render('pages/mybooks', {
                                title: 'Book Trading Club App',
                                error: "",
                                books: result
                 });
           
           console.log("result: ");
           console.log(result);
            }
            else if(!result.length){
                console.log("result: ");
                console.log(result);
                 res.render('pages/mybooks', {
                            title: 'Book Trading Club App',
                            error: "None Available.",
                            books: result
                            });
            }         
            else{
             res.render('pages/mybooks', {
                title: 'Book Trading Club App',
                error: "error",
                books: result
            });
            }

    });
    }
};



////////////////


////////////////


//Book Search page

////////////////


exports.booksearchForm = function(req, res){
 console.log("HERE");
    var db = mongo.client;
    var user1 = req.session.user;
    console.log(req.body.book);
    var book = req.body.book; 
if (book !=""){ 
books.search(book, function(error, results) {
    if ( ! error ) {
        console.log(results);
         res.render('pages/booksearch', {
               title: 'Book Trading Club App',
               books: results
            });
    } else {
        console.log(error);
    }
});  
}  else {
        getBooks(user1,res,db,req, function(result) {
            if(result.length > 0){  
                 res.render('pages/mybooks', {
                                title: 'Book Trading Club App',
                                error: "",
                                books: result
                 });
           
           console.log("result: ");
           console.log(result);
            }
            else if(!result.length){
                console.log("result: ");
                console.log(result);
                 res.render('pages/mybooks', {
                            title: 'Book Trading Club App',
                            error: "None Available.",
                            books: result
                            });
            }         
            else{
             res.render('pages/mybooks', {
                title: 'Book Trading Club App',
                error: "error",
                books: result
            });
            }

    });
    }
};



////////////////


//my AC Settings page

////////////////


exports.acSettings = function(req, res){
    var db = mongo.client;
    var user1 = req.session.user || 0;
    if(user1 !=0){
           db.collection('bookclubappdb', function(err, collection) {
           if (err) throw err; 
             collection.findOne({ email: user1 }, function(err, user) {
        console.log("" + user1 + " " + user1);
            if (err) throw err; 
    if (user) {
        console.log("user exists");
        console.log(user + " " + user1);
              res.render('pages/settings', {
               title: 'Book Trading Club App',
               error: "",
               city: user.city,
               state: user.state
            });
    } else {
        
        console.log("user doesn't exist");
              res.render('pages/settings', {
               title: 'Book Trading Club App',
               error: "",
               city: "",
               state: ""
            });
    }
    });
           
    }); 
    
     }else{
         res.redirect('/'); 
     } 
};


////////////////

exports.logout = function(req, res){
        req.session.user = null;
        res.redirect('/');
};


////////////////x

    // signup form page
exports.signup = function(req, res){
        // render then pass in any data if it exists
        res.render('pages/signup', { 
            title: 'Book Trading Club App',
            error: ""
        }); 
};

/////////////////


exports.updateAC = function(req, res){
    var db = mongo.client;
    var user1 = req.session.user || 0;
    
        console.log("user is " + user1);
    var user = req.session.user || 0;
    console.log("USER: " + user);
    
    console.log(req.body.city);
    console.log(req.body.state);
    var city = req.body.city;    
    var state = req.body.state;
    
    var tagline = "Save Account Details: ";
    
    var qUserObj = {};
     
       qUserObj = { 
         "city": city,
         "state": state
       }; 
       if(user1 !=0){
           db.collection('bookclubappdb', function(err, collection) {
           if (err) throw err; 
             collection.findOne({ email: user1 }, function(err, user) {
        console.log("" + user1 + " " + user1);
            if (err) throw err; 
    if (user) {
        console.log("user exists");
        console.log(user + " " + user1);
        db.collection('bookclubappdb').update({ email: user1 },
                        { $set:{ city : city, state: state } },
                           { upsert: true },
                    function(err, results) {
                    if (err) throw err; 
                    console.log("OK updated..."  + results);
               res.render('pages/settings', {
               title: 'Book Trading Club App',
               error: "Updated",
               city: city,
               state: state
            });
                    });
    } else {
        
        console.log("user doesn't exist");
        res.redirect('/');
    }
    }); 
           
    }); 
  }
else{
   console.log("not logged in");
   res.redirect('/');
}
    
};

/////////////////
 
 // Change PW

/////////////////


exports.ACpwUpdate = function(req, res){
    var db = mongo.client;
    var user1 = req.session.user || 0;
    
    console.log("user is " + user1);
    var user = req.session.user || 0;
    console.log("USER: " + user);
    
    console.log(req.body.oldpw);
    console.log(req.body.newpw);
    var oldpw = req.body.oldpw;    
    var newpw = req.body.newpw;
    
    if (oldpw !="" && newpw !=""){
     var oldpwCheck = bcrypt.hashSync(oldpw, salt);
     var newpwCheck = bcrypt.hashSync(newpw, salt);
   
     
    
    var tagline = "Save Account Details: ";
    
       if(user1 !=0){
           db.collection('bookclubappdb', function(err, collection) {
           if (err) throw err; 
             collection.findOne({ email: user1 }, function(err, user) {
        console.log("" + user1 + " " + user1);
            if (err) throw err; 
    if (user) {
        console.log("user exists");
        console.log(user + " " + user1);
        var userdbpw =  user.password;
        var city = user.city;
        var state = user.state;
        
       if(userdbpw !=null){
         var checkpw = bcrypt.compareSync(oldpw, userdbpw); // true
            console.log("old pw: " + oldpwCheck);
            console.log("db pw: " + userdbpw);
        console.log("res " + checkpw);
          if(checkpw){
                  console.log("db pw good : " + oldpwCheck);
                db.collection('bookclubappdb').update({ email: user1 },
                        { $set:{ password : newpwCheck } },
                           { upsert: true },
                    function(err, results) {
                    if (err) throw err; 
                    console.log("OK updated..."  + results);
               res.render('pages/settings', {
               title: 'Book Trading Club App',
               error: "Password Saved.",
               city: city,
               state: state
            });
                    });
               }
               else
               {
                  console.log("db pw bad: " + oldpwCheck);
                  res.render('pages/settings', {
               title: 'Book Trading Club App',
               error: "Error: Wrong Password or Mismatch!",
               city: city,
               state: state
            });
               }
       }// db pw ok end

///
        
        
    } else {
        
        console.log("user doesn't exist");
       res.redirect('/');
    }
    }); 
           
    }); 
  }
        
    }
    
else{
   console.log("blank fields");
    res.render('pages/settings', {
               title: 'Book Trading Club App',
               error: "Error: Empty Password Field!",
               city: "",
               state: ""
    });
}
    
};

/////////////////


exports.signupData = function(req, res){
    var db = mongo.client;
    
    console.log(req.body.uname);
    console.log(req.body.email);
    console.log(req.body.password);        
    var q0 = req.body.uname;    
    var q1 = req.body.email;
    var q2 = req.body.password;
    
    var tagline = "User Sign Up: ";
    
    var qUserObj = {};
        
    var valEmail = validator.validate(q1);
    console.log(valEmail);
    if (q0 !="" && q1 !="" && q2 !="" && valEmail === true){
     var pwCheck = bcrypt.hashSync(q2, salt);


        console.log("ok" + pwCheck);
     
       qUserObj = { 
         "uname": q0,
         "email": q1, 
         "password": pwCheck,
         "city": "",
         "state": ""
       }; 
       
    checkUser(qUserObj, db ,res,req, function(result) {
         console.log(result);
         console.log(result.ops);
         if(result === 0)
     {
              // saveUser(qUserObj, db,res);
               req.session.user = qUserObj.email;
               res.render('pages/profile', {
                   title: 'Book Trading Club App',
                user: qUserObj.email,
                name: req.session.name,
                 error: "OK",
                tagline: tagline
            });
     }
     if(result === 1)
     {
     //saveUser(qUserObj, db,res);
              // req.session.user = qUserObj.email;
               res.render('pages/login', {
                user: qUserObj.email,
                 error: "Enter Email and Password",
                tagline: tagline
            });
     }
       if(result === 2)
     {
     //saveUser(qUserObj, db,res);
              // req.session.user = qUserObj.email;
               res.render('pages/signup', {
                   title: 'Book Trading Club App',
                user: qUserObj.email,
                 error: "Wrong details.",
                tagline: tagline
            });
     }
     });
       
         
       //res.send(check); 
     
     } else { 
       qUserObj = { 
         "error": "Term not correct, please check again!" 
       }; 
       //res.send(urlObj); 
        res.render('pages/index', {
            title: 'Book Trading Club App',
        "term": q1, 
        "when": "",            
        "error": "Term not correct, please check again!",
        tagline: tagline
    });
     } 
};

/////////////////

// login form page
exports.login = function(req, res){
  // render then pass in any data if it exists
        res.render('pages/login.ejs', { title: 'Book Trading Club App' });
};
//////

    // login process
exports.loginForm = function(req, res){
    var db = mongo.client;
    console.log(req.body.email);
    console.log(req.body.password);        
    var q1 = req.body.email;
    var q2 = req.body.password;
    var tagline = "Log In: ";
    
   var qUserObj = {};
   
   var valEmail = validator.validate(q1);
    console.log(valEmail);
    if (q1 !="" && q2 !="" && valEmail === true){
     var pwCheck = bcrypt.hashSync(q2, salt);
  
   qUserObj = { 
         "email": q1, 
         "password": q2
       };
       
    loginUser(qUserObj, db ,res,req, function(result) {
    
    console.log("IS: " + result);
     if(result === 0){
           res.render('pages/login', {
               title: 'Book Trading Club App',
               user: qUserObj.email,
                 error: "Sign Up",
                tagline: tagline
            });
            
      }
     if(result === 1){
         req.session.user = qUserObj.email;
         console.log("RES: " + result);
         req.session.id = result.id;
         console.log("ID: " + req.session.id);
       res.render('pages/profile', {
           title: 'Book Trading Club App',
               user: qUserObj.email,
               name: req.session.name,
                 error: "Sign Up",
                tagline: tagline
            });    
      }      
      else{
        // render  it exists
       // req.session.user = qUserObj.email;
           res.render('pages/signup', {
               title: 'Book Trading Club App',
               user: qUserObj.email,
                 error: "Sign Up",
                tagline: tagline
            });
      }
    });
    }
    
    else { 
       qUserObj = { 
         "error": "user not correct, please check again!" 
       }; 
       //res.send(urlObj); 
        res.render('pages/index', {
            title: 'Book Trading Club App',
        "term": q1, 
        "when": "",            
        "error": "User not correct, please check again!",
        tagline: tagline
    });
     }
};
    
////////////////    


////////////////////////////////////////////// FUNCTIONS Inner Calls

function checkUser(user1,db , res, req , callback) {
  getData(user1,db , res, req, function(data) {
    callback(data);
  });
}
   
function getData(user1,db , res, req , callback) { 
      // save into db collection
    db.collection('bookclubappdb', function(err, collection) {
           if (err) throw err; 
    collection.findOne({ email: user1.email }, function(err, user) { 
        console.log("" + user1.email + " " + user1);
    if (err) throw err; 
    if (user) { 
        console.log("user exists");
        console.log(user + " " + user1);
         collection.findOne({ password: user1.password }, function(err, user) {
             if (err) throw err; 
        if (user) { 
            console.log("" + user1.email + " " + user1.password);
        callback(1);
        }
        else{
            callback(2);
        }
         });
    } else {
        
        var squery = db.collection('bookclubappdb'); 
        console.log(user1);
        squery.insert(user1, function(err, result1) { 
         if (err) throw err; 
            console.log('Saved ' + result1); 
            //return result;
        callback(0);
        //return 0;
            });
    }
    }); 
    }); 
   } 
//////

//////

function loginUser(user1,db, res, req, callback) {
  getLogData(user1,db, res, req,  function(data) {
    callback(data);
  });
}


function getLogData(user1,db, res, req,  callback) {
    db.collection('bookclubappdb', function(err, collection) {
           if (err) throw err; 
    collection.findOne({ email: user1.email }, function(err, user) {
 if (err) throw err; 
    if ( user ) { 
        console.log("user exists");
        console.log("USER " + user._id);
        req.session.userid = user._id;
        req.session.name = user.uname;
      //  console.log(squery);
      console.log("" + user1.email + ":  " + user1.password);
       var userdbpw =  user.password;
       if(userdbpw !=null){
         var checkpw = bcrypt.compareSync(user1.password, userdbpw); // true
            console.log("db pw: " + user.password);
       
        console.log("res " + checkpw);
          if(checkpw){
                   callback(1);
               }
               else
               {
                   callback(0);
               }
       }// db pw ok end
       else{
        checkpw = 0; 
        callback(0);
       }

      
      //  res.send(user);
    } else {
         console.log("No user exists");
        callback(0);
    }
    });
    }); 
   }
   
   /////////////

function getBooks(user1,res,db,req, callback) {
  getBooksData(user1,res,db,req, function(data) {
    callback(data);
  });
}

function getBooksData(user1,res,db,req, callback) { 
        var cursor = db.collection('books').find( {"userid": req.session.userid } ).sort({ when: -1 });
        cursor.skip(0);
        
         var result = [];


          cursor.each(function(err, item) {
             if(item == null) {
                //db.close();
                  callback(result);
                return;
            }
        console.log(err);
          //console.log(item);

             result.push({ book: item["book"], user: item["user"], image: item["image"] , bookid: item["_id"] } );
             //console.log(JSON.stringify(result));
    });
   }    

//////

 /////////////

function getAllBooks(res,db, callback) {
  getAllBooksData(res,db, function(data) {
    callback(data);
  });
}

function getAllBooksData(res,db, callback) { 
        var cursor = db.collection('books').find().sort({ when: -1 });
        cursor.skip(0);
        
         var result = [];


          cursor.each(function(err, item) {
             if(item == null) {
                //db.close();
                  callback(result);
                return;
            }
        console.log(err);
          //console.log(item);

             result.push({ book: item["book"], userid: item["userid"], image: item["image"], bookid: item["_id"] } );
            // console.log(JSON.stringify(result));
    });
   }    

//////


 /////////////

function getWishList(user1, res,db, callback) {
  getWishListData(user1, res,db, function(data) {
    callback(data);
  });
}

function getWishListData(user1, res,db, callback) { 
        var cursor = db.collection('wishes').find({"userid": user1}).sort({ when: -1 });
        cursor.skip(0);
        
         var result = [];


          cursor.each(function(err, item) {
             if(item == null) {
                //db.close();
                  callback(result);
                return;
            }
        console.log(err);
          //console.log(item);

             result.push({ book: item["book"], user: item["user"] } );
             console.log(JSON.stringify(result));
    });
   }    

//////

////// Delete wish

function delWish(query, db, callback) {
  delWishData(query, db, function(data) {
    callback(data);
  });
}
   /// 
function delWishData(query, db, callback) { 
      // delete in db collection
db.collection('wishes', function(err, collection) {
           if (err) throw err; 
           console.log(query);
    collection.findOne({ 'bookid': query.bookid, 'owner': query.owner, 'wish': true }, function(err, wish) {
            if (err) throw err; 
    if (wish) {
        console.log("wish exists");
            // set to deleted
             collection.findOneAndDelete({ '_id': new ObjectId(query.id) }, function(err, wish) {
                if (err) throw err; 
               // console.log(collection);
                if (wish)  {
                    console.log("book exists");
                    console.log(wish);
                    console.log("Result from removing book: ");
                    // delete record....
                    ///////////////////////
                   callback(wish);
                } else{
                    callback(wish);
                }
                }); 
    } else {
        callback(wish);
    }
    }); 
    });      
}

//////

/////
function getWishes(req, db, res, user1, result, error ){
    db.collection('wishes',function(err,wishlists){
                            if (err) throw err; 
                            wishlists.find({ "userid": req.session.userid }).toArray(function(err, items) {
                                //console.log(wishlists);
                                if (err) throw err; 
                            console.log(items);
                            
                           //////////////////////////////
                           
                           
                           aggWishes(db, res,req, function(docs) {
                               
                            //////////////
                            
                            
                            db.collection('wishes',function(err,wishlists){
                            if (err) throw err; 
                            wishlists.find({ "owner": req.session.userid }).toArray(function(err, tradeitems) {
                                //console.log(wishlists);
                                if (err) throw err; 
                            console.log(tradeitems);
                            
                            
                                 //////////////
                                
                                getTrades(db, res,req, function(trades) {
                                        res.render('pages/books', {
                                    title: 'Book Trading Club App',
                                    error: error,
                                    books: result,
                                    wishes: items,
                                    total: docs,
                                    tradewishes: tradeitems,
                                    trades: trades
                                });
                                });// gettrades total requests
                                
                                //////////////
                            
                            });
                      }) //collection
                             /////
                    }); // get wishes total requests
                           
                           
                           //////////////////////////////
                            });
                      }) //collection
}

////////////////

//////
function aggWishes(db, res ,req, callback) {
  getaggData(db, res,req, function(data) {
    callback(data);
  });
}
   /// 
function getaggData(db, res,req, callback) { 
      // save into db collection
   db.collection('wishes').aggregate(
     [
    { $match: { "userid": req.session.userid } },
    {"$group" : {_id:"$wishcounter", count:{$sum:1}}}, {$sort:{'count':-1}}
     
      // { $group: { "_id": "$going" , "count": { $sum: 1 } } }
     ]).toArray(function(err, result) {
       if ( err ) throw err;
       console.log("AGG:" + result);
       console.log( result);
       //var count = result.count 
       callback(result);
       //callback(count);
     });
   } 
  // end sum totalling




//////
function getTrades(db, res ,req, callback) {
  getTradesData(db, res,req, function(data) {
    callback(data);
  });
}
   /// 
function getTradesData(db, res,req, callback) { 
      // save into db collection
   db.collection('wishes').aggregate(
     [
    { $match: { "owner": req.session.userid } },
    {"$group" : {_id:"$wishcounter", count:{$sum:1}}}, {$sort:{'count':-1}}
     
      // { $group: { "_id": "$going" , "count": { $sum: 1 } } }
     ]).toArray(function(err, resultTrade) {
       if ( err ) throw err;
       console.log("Trade AGG:" + resultTrade);
       console.log( resultTrade);
       //var count = result.count 
       callback(resultTrade);
       //callback(count);
     });
   } 
  // end sum totalling
  
/////////////////////

////// Delete wish

function delMyBook(query, db, callback) {
  delMyBookData(query, db, function(data) {
    callback(data);
  });
}
   /// 
function delMyBookData(query, db, callback) {
      // delete in db collection
db.collection('books', function(err, collection) {
           if (err) throw err; 
           console.log(query);
        collection.findOne({ '_id': new ObjectId(query.bookid) }, function(err, book) {
        console.log("" + book + " " + book);
            if (err) throw err; 
    if (book) {
        console.log("book exists");
        console.log(book);
        db.collection('wishes', function(err, collection) {
           if (err) throw err; 
           collection.remove({ bookid : query.bookid }, function(err, result) {
                console.log("remove wishes.");
            if (err) throw err; 
            ///////////////////
            
   db.collection('books', function(err, collection) {
           if (err) throw err; 
           console.log(query);
        collection.findOne({ '_id': new ObjectId(query.bookid) }, function(err, book) {
        console.log("" + book + " " + book);
            if (err) throw err; 
    if (book) {
        console.log("book exists");
        console.log(book);
        collection.findOneAndDelete({ '_id': new ObjectId(query.bookid) }, function(err, book) {
    if (err) throw err; 
   // console.log(collection);
    if (book)  {
        console.log("book exists");
        console.log(book);
        console.log("Result from removing book: ");
        // delete  record....
        ///////////////////////
       callback(book);
    } else{
        callback(book);
    }
    });
    } else {
    callback(book);
    }
   });   
           
});  
            
            ////////////////////
     //callback(result);
        });
});
    } else {
    callback(book);
    }
   });   
           
});      
}      
//////    

////// Delete trade


function delTrade(query, db, callback) {
  delWishData(query, db, function(data) {
    callback(data);
  });
}
   /// 
function delWishData(query, db, callback) { 
      // delete in db collection
db.collection('wishes', function(err, collection) {
        if (err) throw err; 
           console.log(query);
          collection.update({ 'bookid': query.bookid }, { $set: { 'wish': true } }, {upsert: false, multi: true});
           ///
           
           /// update all to true then change one original record clicked to deleted.....
           
           ////
           
        collection.findOne({ 'bookid': query.bookid, 'owner': query.owner, 'wish': true }, function(err, wish) {
            if (err) throw err; 
    if (wish) {
        console.log("wish exists");

            // set to deleted
             collection.findOneAndDelete({ '_id': new ObjectId(query.id) }, function(err, wish) {
                if (err) throw err; 
               // console.log(collection);
                if (wish)  {
                    console.log("book exists");
                    console.log(wish);
                    console.log("Result from removing book: ");
                    // delete record....
                    ///////////////////////
                   callback(wish);
                } else{
                    callback(wish);
                }
                }); 
    } else {
        callback(wish);
    }
    }); 
    });      
}

//////
    
///////////////////////////////////////////////