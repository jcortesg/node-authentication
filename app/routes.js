module.exports = function(app, passport) {
    //GET homepage
     app.get('/', function(req, res) {
         res.render('index');
     });

    //GET login
     app.get('/login', function(req, res) {
         console.log(req.flash('signupMessage'));
         res.render('index', { message: req.flash('loginMessage')  }); 
     });

     //POST login 
     app.post('/login',passport.authenticate('local-login',{
        successRedirect: '/profile',
        failureRedirect: '/login',
         failureFlash: true
     }));
     //GET singup
    app.get('/signup', function(req, res) {
        res.render('register', { message: req.flash('loginMessage')  });
    });

    //POST singup
    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect : '/profile',
        failureRedirect : '/singup',
        failureFlash : true
    }));

}
