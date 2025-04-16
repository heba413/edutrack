// const express = require('express');
// const router = express.Router();
// const mongoose = require('mongoose');
// const passport = require('passport');

// // Load Validation
// const validateProfileInput = require('../../validation/profile');

// // Load Profile Model
// const Profile = require('../../models/Profile');
// // Load User Model
// const User = require('../../models/User');




// // @route   GET api/profile/test
// // @desc    Tests profile route
// // @access  Public
// router.get('/test', (req, res)=> res.json({msg: 'Profile works'}));

// // @route   GET api/profile
// // @desc    Get current users profile
// // @access  Private
// router.get(
//   '/',
//   passport.authenticate('jwt', { session: false }),
//   (req, res) => {
//     const errors = {};

//     Profile.findOne({ user: req.user.id })
//       .populate('user', ['name', 'avatar'])
//       .then(profile => {
//         if (!profile) {
//           errors.noprofile = 'There is no profile for this user';
//           return res.status(404).json(errors);
//         }
//         res.json(profile);
//       })
//       .catch(err => res.status(404).json(err));
//   }
// );

// // @route   POST api/profile
// // @desc    Create or edit user profile
// // @access  Private
// router.post(
//   '/',
//   passport.authenticate('jwt', { session: false }),
//   (req, res) => {
//     const { errors, isValid } = validateProfileInput(req.body);

//     // Check Validation
//     if (!isValid) {
//        //Return any errors with 400 status
//       return res.status(400).json(errors);
//     }

//     // Get fields
//     const profileFields = {};
//     profileFields.user = req.user.id;
//     if (req.body.handle) profileFields.handle = req.body.handle;
//     if (req.body.userName) profileFields.userName = req.body.userName;
//     if (req.body.bio) profileFields.bio = req.body.bio;
//     if (req.body.emailAddress) profileFields.emailAddress = req.body.emailAddress;
//     if (req.body.phoneNumber) profileFields.phoneNumber = req.body.phoneNumber;
//     if (req.body.district) profileFields.district = req.body.district;
//     if (req.body.city) profileFields.city = req.body.city;
    
//     Profile.findOne({ user: req.user.id }).then(profile => {
//       if (profile) {
//         // Update
//         Profile.findOneAndUpdate(
//           { user: req.user.id },
//           { $set: profileFields },
//           { new: true }
//         ).then(profile => res.json(profile));
//       } else {
//         // Create

//         // Check if handle exists
//         Profile.findOne({ handle: profileFields.handle }).then(profile => {
//           if (profile) {
//             errors.handle = 'That handle already exists';
//             res.status(400).json(errors);
//           }

//           // Save Profile
//           new Profile(profileFields).save().then(profile => res.json(profile));
//         });
//       }
//     });
//   }
// );

// // @route   DELETE api/profile
// // @desc    Delete user and profile
// // @access  Private
// router.delete(
//   '/',
//   passport.authenticate('jwt', { session: false }),
//   (req, res) => {
//     Profile.findOneAndDelete({ user: req.user.id }).then(() => {
//       User.findOneAndDelete({ _id: req.user.id }).then(() =>
//         res.json({ success: true })
//       );
//     });
//   }
// );

// module.exports = router;