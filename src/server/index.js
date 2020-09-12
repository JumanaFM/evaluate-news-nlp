var path = require("path");
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const axios = require("axios");
const bodyParser = require("body-parser");

const mockAPIResponse = require("./mockAPI.js");

dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use(express.static("dist"));

console.log(__dirname);

app.get("/", function (req, res) {
  res.sendFile(path.resolve("dist/index.html"));
});

// designates what port the app will listen to for incoming requests
app.listen(8081, function () {
  console.log("app listening on port 8081!");
});

app.post("/test", async function (req, res) {
  const r = await axios.post(
    `https://api.meaningcloud.com/sentiment-2.1?key=${process.env.API_KEY}&of=json&txt=${req.body.text}&lang=en`
  );

  res.send(r.data);
});
