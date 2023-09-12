import passport from "passport";
import { Strategy as BearerStrategy } from "passport-http-bearer";
import { validateToken } from "./token.js";

passport.use(
    new BearerStrategy(
        {
            passReqToCallback: true,
        },
        async function (req, token, done) {
            const user = await validateToken(req, token);
            if (!user) return done(null, false);
            return done(null, user);
        }
    )
);
export default passport;