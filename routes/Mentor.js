import express from "express";
import { client } from "../index.js";
import { ObjectId } from "mongodb";

const router = express.Router();

//get all mentors
router.get("/", async (req, res) => {
  const result = await client
    .db("Zoiva")
    .collection("mentors")
    .find({})
    .toArray();

  res.send(result);
});

//get mentor by _id
router.get("/:id", async (req, res) => {
  const { id: _id } = req.params;
  const result = await client
    .db("Zoiva")
    .collection("mentors")
    .findOne({ _id: ObjectId(_id) });

  res.send(result);
});


//add a mentor
router.post("/", async (req, res) => {
  const data = req.body;
  const result = await client
    .db("Zoiva")
    .collection("mentors")
    .insertOne(data);
  res.send(result);
});


//delete mentor by _id
router.delete("/:id",async (req,res)=>{
  const {id:_id} = req.params;
  const result = await client.db("Zoiva").collection("mentors").deleteOne({"_id":ObjectId(_id)});
  res.send(result)
})


//update mentor by _id
router.put("/:id", async (req,res)=>{
  const {id:_id} = req.params;
  const data = req.body;
  const result = await client.db("Zoiva").collection("mentors").updateOne({_id:ObjectId(_id)},{$set: data})
  res.send(result)
})

export const mentorRouter = router;
