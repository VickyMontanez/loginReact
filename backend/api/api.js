import express from "express";
import { con } from "../db/atlas.js";

export async function getAllUsers(req, res) {
    try {
        let db = await con();
        let collection = db.collection("users");
        let result = await collection.find({}).sort({ _id: 1 }).toArray();
        if (!result || result.length === 0) {
            res.status(404).json({
                status: 404,
                message: "Not Found"
            });
        } else {
            res.send(result);
        }
    } catch (error) {
        console.log(error);
    }
};

export async function getUserById(req, res, userId) {
    let id = parseInt(userId);
    let db = await con();
    let collection = db.collection("users");
    let result = await collection.find({ _id: id }).toArray();
    try {
        if (!result || result.length === 0) {
            res.status(404).json({
                status: 404,
                message: "Not Found"
            });
        } else {
            res.send(result);
        }
    } catch (error) {
        console.log(error);
    }
};

export async function postUser(req, res) {
    try {
        const db = await con();
        const collection = db.collection('users');
        await collection.insertOne({...req.body});
        res.status(201).json({
            satus: 201,
            message: "User Inserted Successfully :)"
        });
    } catch (e) {
        res.status(500).json({
            satus: 500,
            message: "Internal Server Error :(",
            error: e.message
        });
    }
};

export async function putUser(req, res, userId) {
    try {
        let id = parseInt(userId);
        const db = await con();
        const collection = db.collection('users');
        const updateData = req.body;
        let result = await collection.updateOne({ _id: id }, { $set: updateData }) 
        result.matchedCount === 1 ? 
            res.status(201).json({ status:201, message: "User Updated Successfully :)" }):
            res.status(404).json({ status:404, message: "Not Found :(" });
    } catch (e) {
        console.error(e);
        res.status(500).json({
            satus: 500,
            message: `Internal Server Error :(`,
            error: e.message
        });
    }

};

export async function deleteEmpleados(req, res, userId) {
    try {
        let id = parseInt(userId);
        const db = await con();
        const collection = db.collection('users');
        let result = await collection.deleteOne({
            _id: id
        });
        result.matchedCount === 1 ?
            res.status(201).json({ satus: 201, message: "User Deleted Successfully :)"}):
            res.status(404).json({ status:404, message: "Not Found :(" });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            satus: 500,
            message: `Internal Server Error :(`,
            error: error.message
        });
    }
};