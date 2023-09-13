import express  from "express";
import dotenv from "dotenv";
import { createToken, validateToken } from "./helpers/token.js";
import passport from "./helpers/passportHelper.js";
import appUsers from "./routers/router.js";
dotenv.config();

const app = express();
let config = JSON.parse(process.env.MY_CONFIG);
app.use(express.json());

app.use("/login", createToken);
app.use("/usuarios", appUsers)

app.listen(config, ()=> {
    console.log(`http://${config.hostname}:${config.port}`);
})