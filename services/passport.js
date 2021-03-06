const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;
const mongoose = require("mongoose");
const keys = require("../keys/keys");
// const User = mongoose.model("users");
const User = require("../models/Users");

const errHandler = (err) =>{
  console.log("Error :: "+ err);
}

passport.serializeUser((user, done) => {
  done(null, user.ID);
});

passport.deserializeUser((id, done) => {
  User.findOne({where: {ID: id}}).then(user => {
    done(null, user);
  }); 
});

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: "/auth/google/callback",
      proxy: true
    },
    async (accessToken, refreshToken, profile, done) => {
      const existingUser = await User.findOne({where: {googleID: profile.id }});
      console.log("existingUser");
      console.log(existingUser);
      if (existingUser) {
        return done(null, existingUser);
      } 
      const user = await User.create({ googleID: profile.id, name: profile.displayName, email: profile._json.email, is_admin: false }).catch(errHandler);
      console.log(profile._json);
      done(null, user);
    }
  )
);

// passport.use(
//   new FacebookStrategy({
//     clientID: keys.facebookAppID,
//     clientSecret: keys.facebookAppSecret,
//     callbackURL: "/auth/facebook/callback"
//   },
//     (accessToken, refreshToken, profile, cb) => {
//       user.findOne({facebookId: profile.id}).then( existingFBUser =>{
//         if(existingFBUser){

//         }
//         else{
//           user.findOne({email: profile.email}).then( existingUser =>{
//             if(existingUser){

//             }
//             else{
//               new user({facebookId: profile.id})
//             }
//           })
//         }
//       })
//     })
// );
