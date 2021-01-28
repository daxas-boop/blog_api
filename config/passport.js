const JtwStrategy = require('passport-jwt').Strategy;
const { ExtractJwt } = require('passport-jwt');
const fs = require('fs');
const path = require('path');
const User = require('../models/user');

const PUB_KEY = fs.readFileSync(path.join(__dirname, '..', 'id_rsa_pub.pem'));

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: PUB_KEY,
  algorithms: ['RS256'],
};

const strategy = new JtwStrategy(options, (payload, done) => {
  User.findOne({ _id: payload.sub }, (err, user) => {
    if (err) {
      return done(err, false);
    }
    if (user) {
      return done(null, user);
    }
    return done(null, false);
  });
});

module.exports = (passport) => {
  passport.use(strategy);
};
