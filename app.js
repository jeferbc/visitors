const express = require("express");
const mongoose = require("mongoose");

const app = express();

mongoose.connect(process.env.MONGODB_URL || 'mongodb://localhost:27017/mongo-1', { useNewUrlParser: true });

const VisitorSchema = new mongoose.Schema({
  name: { type: String },
  date: { type: Date, default: Date.now }
});
const Visitor = mongoose.model("Visitor", VisitorSchema);

app.get("/", async (req, res) => {
  const visitor = new Visitor({ name: req.params.name || "Anónimo" });
  await visitor.save()

  res.send("<h1>El visitante fue almacenado con éxito.</h1>")
});

app.listen(3000, () => console.log("Listening on port 3000 ..."));
