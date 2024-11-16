
const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const securityConst = require('../shared/constants/securityConst');
const userRepository = require('../repository/userRepository');

const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: securityConst.TOKEN_KEY
};

passport.use(
    new JwtStrategy(options, (payload, done)=>{
        userRepository.findById(payload.id)
            .then((user)=>{
                if(!user){
                    return done(null, false);
                }
                //save user to request
                return done(null, user);
            })
            .catch((error)=>{
                console.log(error);
                return done(error, false);
            })
    })
);

module.exports = passport;