import express from "express";
import { client } from "../index.js";
import { ObjectId } from "mongodb";

const router = express.Router();

//get all students
router.get("/", async (req, res) => {
  const result = await client
    .db("Zoiva")
    .collection("students")
    .find({})
    .toArray();

  res.send(result);
});

//get all unassigned students
router.get("/unassigned", async (req, res) => {
  const result = await client
    .db("Zoiva")
    .collection("students")
    .find({})
    .toArray();

    const final = result.filter(std=> !std.mentor)

  res.send(final);
});


//get student by _id
router.get("/:id", async (req, res, next) => {
  const { id: _id } = req.params;

  if (!_id) {
    next();
  }
  const result = await client
    .db("Zoiva")
    .collection("students")
    .findOne({ _id: ObjectId(_id) });

  res.send(result);
});


//add a student
router.post("/", async (req, res) => {
  const data = req.body;
  const result = await client
    .db("Zoiva")
    .collection("students")
    .insertOne(data);
  res.send(result);
});


//delete student by _id
router.delete("/:id", async (req, res) => {
  const { id: _id } = req.params;
  const result = await client
    .db("Zoiva")
    .collection("students")
    .deleteOne({ _id: ObjectId(_id) });
  res.send(result);
});


//update student by _id
router.put("/:id", async (req, res) => {
  const { id: _id } = req.params;
  const data = req.body;
  const result = await client
    .db("Zoiva")
    .collection("students")
    .updateOne({ _id: ObjectId(_id) }, { $set: data });
  res.send(result);
});


export const studentRouter = router;
