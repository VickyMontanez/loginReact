import { SignJWT, jwtVerify } from "jose";
import express from "express";
import { con } from "../db/atlas.js";
import dotenv from "dotenv";
dotenv.config();

const createToken = async (req, res, next) => {
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
        const id = result._id.toString();
        const encoder = new TextEncoder();
        const jwtConstructor = await new SignJWT({ id: id })
            .setProtectedHeader({ alg: "HS256", typ: "JWT" })
            .setIssuedAt()
            .setExpirationTime("3h")
            .sign(encoder.encode(process.env.JWT_PRIVATE_KEY));
            req.data = { status: 200, message: jwtConstructor, user: result.username };
            next();
    } catch (error) {
        console.error("Error de conexión a la base de datos:", error);
        return res.status(500).send({ status: 500, message: "Error interno del servidor" });
        
    }
};

const validateToken = async (req, token) => {
    try {
        const connection = con();
        const encoder = new TextEncoder();
        const jwtData = await jwtVerify(
            token,
            encoder.encode(process.env.JWT_PRIVATE_KEY)
        );
        
        const userId = jwtData.payload.id;

        const res = await connection.collection("users").findOne({
            _id: new ObjectId(userId)
        });
        if (!res) return res.status(401).send({ status: 401, message: "Unauthorized", error: "User Not Found" });

        const user = {
            _id: res._id,
            username: res.username,
        };

        return user;
    } catch (error) {
        console.log(error);
        return res.status(500).send({ status: 500, message: "Internal Server Error", error: error });
    }
};
export { createToken, validateToken };