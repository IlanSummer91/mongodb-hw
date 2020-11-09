const express = require("express");
const router = express.Router();
const { getPosts, deletePost } = require('../db.js');
const { ObjectID } = require('mongodb');

router.route("/")
  .get(async (req, res) => {
  const query = req.query.search ? { name: req.query.search } : {};
  (await getPosts())
    .find(query)
    .toArray((err, docs) => {
      res.json(docs);
    })
  })
  .post(async (req, res) => {
    (await getPosts())
      .insertOne(req.body);
      res.json({})
  });

router.route("/:id")
  .get(async (req, res) => {
    (await getPosts())
      .findOne({
        _id: ObjectID.createFromHexString(req.params.id),
      }, (err, doc) => {
        res.json(doc);
      })
  })
  .delete(async (req, res) => {
    const postId = ObjectID.createFromHexString(req.params.id);
    (await deletePost(postId));
      res.json({});
    })
  .put(async (req, res) => {
    (await getPosts())
      .updateOne( { _id: ObjectID.createFromHexString(req.params.id) },
      { $set: req.body });
      res.json({});
  })

module.exports = router;