/*  EXPRESS SETUP  */

const express = require('express');
const app = express();

app.use(express.static(__dirname));

const bodyParser = require('body-parser');
const expressSession = require('express-session')({
  secret: 'secret',
  resave: false,
  saveUninitialized: false
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressSession);

const passport = require('passport');

app.use(passport.initialize());
app.use(passport.session());

const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

mongoose.connect('mongodb://localhost/MyDatabase',
  { useNewUrlParser: true, useUnifiedTopology: true });

const Schema = mongoose.Schema;
const UserDetail = new Schema({
  username: String,
  password: String,
  email: String
});

var FeedSchema= new Schema({
  feedback: String,
  user: String,
  email: String
},{timestamps: true});
var FeedB = mongoose.model('Feedback', FeedSchema, 'feedback');

var AlgoSchema= new Schema({
  algo: String,
  user: String,
  email: String
},{timestamps: true});
var AlgoB = mongoose.model('Algo', AlgoSchema, 'algorithm');


app.set('view engine', 'ejs');



UserDetail.plugin(passportLocalMongoose);
const UserDetails = mongoose.model('userInfo', UserDetail, 'userInfo');

passport.use(UserDetails.createStrategy());

passport.serializeUser(UserDetails.serializeUser());
passport.deserializeUser(UserDetails.deserializeUser());

const connectEnsureLogin = require('connect-ensure-login');
const { use } = require('passport');

app.post('/login', (req, res, next) => {
  passport.authenticate('local',
  (err, user, info) => {
    
    if (err) {
      return next(err);
    }
    if (!user) {
        info="Invalid username or password";
        return res.redirect('/login?info=' + info);
    }

    req.logIn(user, function(err) {
      if (err) {
        return next(err);
      }

      return res.redirect('/');
    });

  })(req, res, next);
});


app.get('/login',
  (req, res) => {
    if (req.user) {
      // logged in
      res.redirect("/")
    } else {
      res.sendFile('html/login.html',
      { root: __dirname })
      // not logged in
  }

  });


  
app.get('/',
  connectEnsureLogin.ensureLoggedIn(),
  (req, res) => {
  if(req.user.username.toLowerCase()=="admin"){
    FeedB.find({}, (err, feed) => {

      if (err) console.error(err);
      
      AlgoB.find({}, (err, algo) => {

     
      res.render('admin',{feedback : feed,algorithm : algo});
      })
    })
  }  
  else{
  res.sendFile('html/index.html', {root: __dirname})
  }
}
);
app.get('/del/:id',function(req, res){
  FeedB.deleteOne({_id:req.params.id}, (err, feed) => {

    if (err) console.error(err);
    
    res.redirect("/");
  })  
});

app.get('/delal/:id',function(req, res){
  AlgoB.deleteOne({_id:req.params.id}, (err, feed) => {

    if (err) console.error(err);
    
    res.redirect("/");
  })  
});

app.get('/sort',
  connectEnsureLogin.ensureLoggedIn(),
  (req, res) => res.sendFile('html/proj/index.html', {root: __dirname})
);
app.get('/search',
  connectEnsureLogin.ensureLoggedIn(),
  (req, res) => res.sendFile('html/proj/search.html', {root: __dirname})
);


app.get('/algo/:dir/:name',
  connectEnsureLogin.ensureLoggedIn(),
  (req, res) => res.sendFile('html/proj/'+req.params.dir+'/'+req.params.name+'', {root: __dirname})
);


app.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});


app.get('/user',
  connectEnsureLogin.ensureLoggedIn(),
  (req, res) => res.send({user: req.user})
);

app.get('/algo/:name',
  connectEnsureLogin.ensureLoggedIn(),
  (req, res) => res.sendFile('html/proj/'+req.params.name+'.html', {root: __dirname})
);


// UserDetails.register({username:'paul', active: false}, 'paul');

app.get('/register',

  (req, res) => res.sendFile('html/register.html',
  { root: __dirname })
);

app.post('/register', (req, res, next) => {

UserDetails.findOne({ username: req.body.username.toLowerCase()},(err,document)=> {
  if(document != null){
    return res.redirect('/register?info=' + "User exists");  
  }else{
    UserDetails.register({username:req.body.username.toLowerCase(), active: false,email:req.body.email}, req.body.password);
    return res.redirect('/register?info=' + "Account created, please login");  
     }
  })
});

app.get('/addfeed',
  connectEnsureLogin.ensureLoggedIn(),
  (req, res) =>{ res.render('newfeed')
});

app.post('/addfeed',
  connectEnsureLogin.ensureLoggedIn(),
  (req, res) =>{ 
    var Feed1 = new FeedB({ feedback: req.body.text ,user:req.user.username.toLowerCase(),email:req.user.email});

    // save model to database
    Feed1.save(function (err, FeedB) {
      if (err) return console.error(err);
      }); 
    res.redirect("/");
});

app.get('/addalgo',
  connectEnsureLogin.ensureLoggedIn(),
  (req, res) =>{ res.render('addalgo')
});

app.get('/tree',
  connectEnsureLogin.ensureLoggedIn(),
  (req, res) =>{ res.redirect('http://localhost:3000')
});

app.post('/addalgo',
  connectEnsureLogin.ensureLoggedIn(),
  (req, res) =>{ 
    var Algo1 = new AlgoB({ algo: req.body.text ,user:req.user.username.toLowerCase(),email:req.user.email});
    console.log(req.body.text);
    // save model to database
    Algo1.save(function (err, AlgoB) {
      if (err) return console.error(err);
      }); 
    res.redirect("/");
});

const port = process.env.PORT || 3001;
app.listen(port, () => console.log('App listening on port ' + port));
