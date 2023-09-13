import { SignJWT, jwtVerify } from "jose";
import express from "express";
import { con } from "../db/atlas.js";
import dotenv from "dotenv";
dotenv.config();
const createToken = express();

createToken.get("/", async (req, res, next) => {
    try {
        const connection = await con();
        if (Object.keys(req.body).length === 0) {
            return res.status(400).send({ status: 400, message: "Data no sent :(" });
        }
        const { username, password } = req.body
        const user = await connection.collection('users').findOne({ username: username });
        if (!user || user.password !== password) {
            return res.status(401).json({ status: 401, message: 'Credenciales inválidas' });
        }
        const id = user._id.toString();
        const encoder = new TextEncoder();

        const jwtConstructor = await new SignJWT({ _id: id })
            .setProtectedHeader({ alg: "HS256", typ: "JWT" })
            .setIssuedAt()
            .setExpirationTime("3h")
            .sign(encoder.encode(process.env.JWT_PRIVATE_KEY));
        return res.status(200).json({ status: 200, jwt: jwtConstructor });
    } catch (error) {
        console.error("Error de conexión a la base de datos:", error);
        return res.status(500).send({ status: 500, message: "Error interno del servidor" });
    }
});

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