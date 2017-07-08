
const authRouter = require('express').Router();
const passport = require('passport');
// const User  = require('../db/models/User.js');

// Logs user out, not current accessible by UI
// authRouter.post('/logout', (req, res) =>
//   req.session.destroy((err) => {
//     if (err) {
//       res.sendStatus(500);
//       return console.log('Error logging out: ', err);
//     }
//     console.log('User logged out');
//     return res.sendStatus(200);
//   }));

// Route used by App.jsx to see if user is logged in
// authRouter.get('/verify', (req, res) => {
//   if (req.session.passport) {
//     const userSession = req.session.passport.user;
//     const userKey = Object.keys(userSession)[0];
//     const obj = Object.assign({ isLoggedIn: true }, { user: userSession[userKey] });
//     res.send(obj);
//   } else {
//     res.send({ isLoggedIn: false });
//   }
// });

// authRouter.get('/data', function() {
//    User.findAll().then(function(data) {
//    	res.send(data); 
//    })
// })

// Google oauth route
authRouter.get('/google',
  passport.authenticate('google', { prompt: 'consent', scope: ['profile','email'] }));

// Google oauth callback
authRouter.get('/google/callback',
  passport.authenticate('google', { prompt: 'consent', failureRedirect: '/' }),
  (req, res) => res.redirect('/'));

module.exports = authRouter;