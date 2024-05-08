const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const PORT = 5000;

//cors
app.use(cors());

//convert it into json type
app.use(bodyParser.json());

mongoose.connect(
  "mongodb+srv://rakabiswal123:rakabiswal123@cluster0.zlju9wx.mongodb.net/tetratriondb"
);
mongoose.connection.on("connected", () => {
  console.log("Connected to database 🔥🔥🔥");
});

const itemsRouter = require("./routes/items");
app.use("/items", itemsRouter);

app.get("/", (req, res) => {
  res.send("welcome to backend");
});

const { GoogleGenerativeAI } = require("@google/generative-ai");
const API_KEY = "AIzaSyB-AGIoN2rpUs0AdXYS7c972a3CqtLGSdY";
const MODEL_NAME = "gemini-pro";

const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model: MODEL_NAME });

app.post("/generate", async (req, res) => {
  const { prompt } = req.body;
  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();

  res.json({ text });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
