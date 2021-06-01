require('dotenv');
var passport = require('passport');
const FacebookStrategy = require('passport-facebook');
const GoogleStrategy = require('passport-google-oauth20');
const { User } = require('../models/User');

passport.serializeUser(function (user, done) {
    done(null, user.id);
});

passport.deserializeUser(function (user, done) {
    done(null, user);
});

/** Facebook Auth config */
passport.use(
    new FacebookStrategy({
        clientID: process.env.fbClientID,
        clientSecret: process.env.fbClientSecret,
        callbackURL: process.env.fbCallbackURL,
        profileFields: ['email', 'displayName', 'gender']
    },
        async function (accessToken, refreshToken, profile, done) {
            // passport Callback function 
            await User.findOne({ email: profile.emails[0].value })
                .then(async user => {
                    if (!user) {
                        await new User({
                            fbID: profile.id,
                            name: profile.displayName,
                            email: profile.emails[0].value
                        }).save().then(user => {
                            done(null, user);
                        });
                    } else {
                        user.fbID = profile.id;
                        await user.save();

                        done(null, user);
                    }
                })
        }
    )
);

/** Google Auth config */
passport.use(
    new GoogleStrategy({
        // options for strategy
        clientID: process.env.goClientID,
        clientSecret: process.env.goClientSecret,
        callbackURL: process.env.goCallbackURL
    }, async (accessToken, refreshToken, profile, done) => {
        // passport Callback function 
        await User.findOne({ email: profile.emails[0].value })
            .then(async user => {
                if (!user) {
                    await new User({
                        goID: profile.id,
                        name: profile.displayName,
                        email: profile.emails[0].value
                    }).save().then(user => {
                        done(null, user);
                    });
                } else {
                    user.goID = profile.id;
                    await user.save();
                    done(null, user);
                }
            })
    })
);