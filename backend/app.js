const mongoose = require("mongoose");
const express = require("express");

const app = express();

app.use(express.json());

const DB_URI =
  "mongodb+srv://admin:admin%40123@cluster0.9o4w8.mongodb.net/auth_app?retryWrites=true&w=majority&appName=Cluster0";

mongoose.connect(DB_URI);

const userModel = new mongoose.Schema({
  email: String,
  password: String,
  name: String,
});
const User = mongoose.model("User", userModel);

app.post("/register", async (req, res) => {
  try {
    const { email, password } = req.body;
    const newUser = new User({ email: email, password: password });
    await newUser.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    res.status(500).json({ error: "Registration failed" });
  }
});

app.get("/login", async (req, res) => {
  const { email, password } = req.body;
  const isUser = await User.findOne({ email: email, password: password });
  if (!isUser) {
    res.status(404).json({ message: "User Not found" });
  } else {
    res.status(200).json({ message: "Successfully signed In !!" });
  }
});

app.listen(5000, () => {
  console.log("Server is listening on port 3000");
});
