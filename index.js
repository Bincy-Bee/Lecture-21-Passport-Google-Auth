const express = require('express');
const app = express();
const session = require('express-session');
const passport = require('passport');
app.use(express.json());
app.use(session({secret:"key"}));
app.use(passport.initialize());
app.use(passport.session());
const GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.use(new GoogleStrategy({
    clientID: "1027144264499-qehfduhl1leu52v5eoo1il87l6h471bg.apps.googleusercontent.com",
    clientSecret: "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",
    callbackURL: "http://localhost:8090/auth/google/callback"

},(accessToken, refreshToken, profile, cb)=>{
    return cb(null, profile)
})
);
passport.serializeUser((user,done)=>{
    return done(null,user)
})
passport.deserializeUser((user,done)=>{
    return done(null,user)
});

app.get('/auth/google',
  passport.authenticate('google', { scope: ['profile','email'] }));

app.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: '/login' }),
  (req, res)=> {
    res.send("Successfully Sign In with Google");
  });

app.listen(8090, ()=>{
    console.log('Server is listening on http://localhost:8090')
})