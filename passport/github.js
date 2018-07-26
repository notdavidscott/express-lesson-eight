var GithubStrategy = require('passport-github').Strategy;
var models = require('../models');
const passport = require('passport');

passport.use(
  'github',
  new GithubStrategy(
    {
      clientID: 'f1c3510aefe1bcac0d9c',
      clientSecret: 'd7e2535904363eb60a2d1ac43c07135500aecdae',
      callbackURL: 'http://localhost:3000/users/login/github/callback'
    },
    function(access_token, refresh_token, profile, done) {
        models.users
          .findOne({
            where: {
              AuthId: profile.id
            }
          })
        .then(user => {
            //displayName for their name which includes both the first and last name. 
            //In your database, you have two columns for the name: FirstName & LastName
            //you need to spread two variables, firstName and lastName and then split the 
            //profile.displayName on the space between the two names.
            let name = profile.displayName;
          let [firstName, ...lastName] = name.split(' ');
          lastName = lastName.join(' ');
          if (!user) {
            return models.users
              .create({
                AuthId: profile.id,
                FirstName: firstName,
                LastName: lastName
              })
              .then(user => {
                done(null, user);
              });
          } else {
            done(null, user);
          }
        })
        .catch(err => {
          if (err) {
            console.log('error');
            return done(err);
          }
        });
    }
  )
);