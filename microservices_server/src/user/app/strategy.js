const passport = require("passport");
const dotenv = require("dotenv");
// const { redis } = require("../utils/redis");
const { User } = require("./models/user");
dotenv.config();
const JwtStrategy = require("passport-jwt").Strategy,
  ExtractJwt = require("passport-jwt").ExtractJwt;
var opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWTPRIVATEKEY,
};

passport.use(
  //admin authentication strategy for passport
  "user",
  new JwtStrategy(opts, async (jwt_payload, done) => {
    try {
      let user;
      user = await User.findById(jwt_payload._id); //search for the user in primary database
      if (user) {
        return done(null, user); // if user exists return user and null error
      } else {
        return done(null, false);
        // or you could create a new account else return false
      }
    } catch (error) {
      console.error(error);
      return done(error, false); // return error in case any
    }
  })
);

module.exports = passport;
