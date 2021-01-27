const express = require("express");

// database access using knex
const db = require("../data/db-config.js");

const router = express.Router();

db.on("query", (data) => {
  console.log(data.sql);
});

router.get("/", async (req, res) => {
  try {
    // to see what is going on
    const sql = await (await db("posts")).toString();
    console.log("sql: ", sql);
    //to see what is going on ^

    const posts = await db.select("posts");
    res.json(posts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "error with db", error: error });
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const [post] = await db("posts").where({ id });

    if (post) {
      res.json(post);
    } else {
      res.status(404).json({ message: "could not find post with given id " });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to get post" });
  }
});

router.post("/", async (req, res) => {
  const postData = req.body;

  try {
    const post = await db("posts").insert(postData);
    res.status(201).json(post);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "problem with db", error: error });
  }
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const changes = req.body;

  try {
    const count = await db("posts").update(changes).where({ id });
    if (count) {
      res.json({ update: count });
    } else {
      res.status(404).json({ message: "invalid id" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "problem w/ db", error: error });
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const count = await db("posts").del().where({ id });
    if (count) {
      res.json({ deleted: count });
    } else {
      res.status(404).json({ message: "invalid id" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "problem w/ db", error: error });
  }
});

module.exports = router;

db.on("query", (data) => {
  console.log(data.sql);
});

router.get("/", async (req, res) => {
  try {
    //give insight on what is happening
    const sql = await db("posts").toString();
    console.log("sql: ", sql);

    const posts = await db("posts");
    res.json(posts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "err with db", error: error });
  }

  // const posts = await db.select('*').from('posts');
  // res.json(posts);

  // db.select('*').from('posts');
  //     .then(posts => {
  //         res.json(posts);
  //     })
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const [post] = await db("posts").where({ id });

    if (post) {
      res.json(post);
    } else {
      res.status(404).json({ message: "Could not find post with given id." });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "failed to get post" });
  }
});

router.post("/", async (req, res) => {
  const postData = req.body;
  try {
    const post = await db("posts").insert(postData);
    res.status(201).json(post);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "problem with db", error: error });
  }
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const changes = req.body;
  try {
    const count = await db("posts").update(changes).where({ id });
    if (count) {
      res.json({ update: count });
    } else {
      res.status(404).json({ message: "invalid id" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "prob with db", error: error });
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const count = await db("posts").del().where({ id }).del();

    if (count) {
      res.json({ deleted: count });
    } else {
      res.status(404).json({ message: "invalid id" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "problem with db", error: error });
  }
});

module.exports = router;
