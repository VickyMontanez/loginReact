import express from "express";
import { getAllUsers, getUserById, postUser, putUser, deleteUser } from "../api/users.js";
import { limitLogin } from "../helpers/limit.js";
import passport from "../helpers/passportHelper.js"

const appUsers = express();
appUsers.use(express.json());
appUsers.use(limitLogin());
/* appUsers.use((req, res, next) => {
    const apiVersion = req.headers["x-api"];
    if (apiVersion === "1.0") {
        next();
    } else {
        res.status(400).json({
            status: 400,
            message: "API Version No Compatible :("
        });
    }
}); */
// appUsers.use(passport.authenticate("bearer", {session: false}));
appUsers.get("/all", getAllUsers);
appUsers.get("/:id", async (req, res) => {
    const userId = req.params.id; 
    getUserById(req, res, userId)
});
appUsers.post("/post", postUser);
appUsers.put("/update/:id",  async (req, res) => {
    const userId = req.params.id; 
    putUser(req, res, userId)
});
appUsers.delete("/delete/:id", async (req, res) => {
    const userId = req.params.id; 
    deleteUser(req, res, userId)
});

export default appUsers;