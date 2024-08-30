const passport = require('passport');
const person = require('./models/person');
const localStratergy = require('passport-local').Strategy;
passport.use(new localStratergy(async (username, password, done) => {
    try {
        const user = await person.findOne({ username: username });
        if (!user) {
            return done(null, false, { message: "Incorrect Username" });
        }
        const passwordMatch = await user.comparePassword(password);
        if (passwordMatch) {
            return done(null, user);
        } else {
            return done(null, false, { message: "Incorrect Password" });
        }
    } catch (err) {
        return done(err);
    }
}));

module.exports = passport;