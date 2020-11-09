const express = require("express");
const router = express.Router();
const { getUsers, getPosts, deleteUser } = require('../db.js');
const { ObjectID } = require('mongodb');

router.get("/", async (req, res) => {
  const query = req.query.search ? { name: req.query.search } : {};
  (await getUsers())
    .find(query)
    .toArray((err, docs) => {
      res.json(docs);
    });
});

router.route("/:id")
  .get(async (req, res) => {
    (await getUsers())
      .findOne({
        _id: ObjectID.createFromHexString(req.params.id),
      }, (err, doc) => {
        res.json(doc);
      })
  })
  .delete(async (req, res) => {
    const userId = ObjectID.createFromHexString(req.params.id);
    (await deleteUser(userId));
    res.json({});
  })
  .put(async (req,res) => {
    (await getUsers())
      .updateOne( { _id: ObjectID.createFromHexString(req.params.id) },
      { $set: req.body });
      res.json({});
  });

router.get("/:id/posts", async (req, res) => {
  (await getPosts())
    .find({
      userId: parseInt(req.params.id),
    })
    .toArray((err, docs) => {
      res.json(docs);
    });
});

module.exports = router;