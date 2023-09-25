import passport from "passport";
import { Strategy as BearerStrategy } from "passport-http-bearer";
import { validateToken } from "./token.js";

passport.use(
    new BearerStrategy(
        {
            passReqToCallback: true,
        },
        async function (req, token, done) {
            try {
                const user = await validateToken(req, token);
                console.log(token);
                if (!user) {
                    console.log('Token no válido');
                    return done(null, false);
                }

                console.log('Autenticación exitosa para el usuario:', user);
                return done(null, user);
            } catch (error) {
                console.error('Error al validar el token:', error);
                return done(error, false);
            }
        }
    )
);

export default passport;