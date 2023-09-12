import { SignJWT, jwtVerify } from "jose";
import { con } from "../db/atlas.js";
import dotenv from "dotenv";
dotenv.config();
const createToken = async (req, res, next) => {
    try {
        const connection = con();
        const conexionDB = await connection.getDatabase();
        if (Object.keys(req.body).length === 0) {
            return res.status(400).send({ status: 400, message: "Data no sent :(" });
        }
        const { username, password } = req.body
        const user = await conexionDB.collection("users").findOne({ "username": username });

        if (!user) {
            return res.status(401).send({ status: 401, message: `User ${user} not found` });
        }
        /*         const passwordMatch = await UserSchema.matchPassword( contraseña, usuario.contraseña);
        
                if (!passwordMatch) {
                    return res.status(401).send({ message: "Contraseña incorrecta" });
                } */

        const id = user._id.toString();
        const encoder = new TextEncoder();

        const jwtConstructor = await new SignJWT({ _id: id })
            .setProtectedHeader({ alg: "HS256", typ: "JWT" })
            .setIssuedAt()
            .setExpirationTime("3h")
            .sign(encoder.encode(process.env.JWT_PRIVATE_KEY));

        req.data = {
            status: 200,
            message: "Usuario encontrado!! Toma tu token :D",
            token: jwtConstructor,
        };
        next();
    } catch (error) {
        console.error("Error de conexión a la base de datos:", error);
        return res.status(500).send({ status: 500, message: "Error interno del servidor" });
    }
};

const validateToken = async (req, token) => {
    try {
        const connection = con();
        const conexionDB = await connection.getDatabase();
        const encoder = new TextEncoder();
        const jwtData = await jwtVerify(
            token,
            encoder.encode(process.env.JWT_PRIVATE_KEY)
        );
        //parte en veremos :(
        let res = await conexionDB.collection("users").findOne({
            "_id": parseInt(jwtData.payload.id)
        });

        req.data = res._id;
        return res;
    } catch (error) {
        return false;
    }
};
export { createToken, validateToken };