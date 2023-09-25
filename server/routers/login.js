import { createToken } from "../helpers/token.js";
import { Router } from "express";
import { loginV1 } from "../api/controller/login.js";

const appLogin = Router();

appLogin.use(createToken);
appLogin.post("/", loginV1);

export {appLogin};