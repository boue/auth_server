const Authentication = require('./controllers/authentication');
const passportService = require('./services/passport');
const passport = require('passport');

//passport wants to make a cookie based request by default but we are using token
//got to put session: false

//requireAuth is the middleware it is the interceptor for any routes we need auth for
const requireAuth = passport.authenticate('jwt', { session: false });
const requireSignin = passport.authenticate('local', { session: false });

module.exports = function(app){
  app.get('/', requireAuth, function(req, res) {
    res.send({ hi: 'there' });
  });
  //have to go thru requireSignin middleware before Authentication.signup access
  app.post('/signin', requireSignin, Authentication.signin); 
  //post a username and password
  app.post('/signup', Authentication.signup);
}