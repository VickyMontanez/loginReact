import express  from "express";
import dotenv from "dotenv";
import {loadEnv} from 'vite';
import { createToken, validateToken } from "./helpers/token.js";
import passport from "./helpers/passportHelper.js";
import appUsers from "./routers/router.js";
import cors from "cors"
import { appLogin } from "./routers/login.js";
const env = loadEnv("development", process.cwd(), 'VITE')



dotenv.config();

const app = express();
let config = {
    port: env.VITE_PORT_BACKEND,
    hostname: env.VITE_HOSTNAME
}
app.use(express.json());
app.use(cors());

app.use("/login", appLogin);
app.use("/usuarios", appUsers);

app.listen(config, ()=> {
    console.log(`http://${config.hostname}:5194`);
})
