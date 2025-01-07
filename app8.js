"use strict";
const express = require("express");
const cors = require("cors");
const app = express();

let bbs = [];  // 本来はDBMSを使用するが，今回はこの変数にデータを蓄える

app.set('view engine', 'ejs');
app.use("/public", express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// 既存のGETとPOSTルート（省略）

// BBS用ルート
app.post("/post", (req, res) => {
  const name = req.body.name;
  const message = req.body.message;
  bbs.push({ name: name, message: message, likes: 0 });
  res.json({ number: bbs.length });
});

app.post("/check", (req, res) => {
  res.json({ number: bbs.length });
});

app.post("/read", (req, res) => {
  const start = Number(req.body.start);
  res.json({ messages: start == 0 ? bbs : bbs.slice(start) });
});

app.post("/delete", (req, res) => {
  const index = Number(req.body.index);
  if (index >= 0 && index < bbs.length) {
    bbs.splice(index, 1);
    res.json({ status: "success", message: "Deleted successfully" });
  } else {
    res.json({ status: "error", message: "Invalid index" });
  }
});

app.post("/edit", (req, res) => {
  const index = Number(req.body.index);
  const newMessage = req.body.message;
  if (index >= 0 && index < bbs.length) {
    bbs[index].message = newMessage;
    res.json({ status: "success", message: "Edited successfully" });
  } else {
    res.json({ status: "error", message: "Invalid index" });
  }
});

app.post("/search", (req, res) => {
  const keyword = req.body.keyword.toLowerCase();
  const results = bbs.filter(post => 
    post.name.toLowerCase().includes(keyword) || post.message.toLowerCase().includes(keyword)
  );
  res.json({ status: "success", results: results });
});

app.post("/like", (req, res) => {
  const index = Number(req.body.index);
  if (index >= 0 && index < bbs.length) {
    bbs[index].likes = (bbs[index].likes || 0) + 1;
    res.json({ status: "success", likes: bbs[index].likes });
  } else {
    res.json({ status: "error", message: "Invalid index" });
  }
});

app.listen(8080, () => console.log("Example app listening on port 8080!"));
