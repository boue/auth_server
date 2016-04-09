const Authentication = require('./controllers/authentication');

module.exports = function(app){
  //post a username and password
  app.post('/signup', Authentication.signup);
}