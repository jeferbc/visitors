const express = require('express');
const app = express();
const mongoose = require("mongoose");

mongoose.connect(process.env.MONGODB_URL || 'mongodb://localhost:27017/mongo-1', { useNewUrlParser: true });
mongoose.connection.on("error",function(e){console.error(e);});
app.use(express.urlencoded());

// definimos el schema
var schema = mongoose.Schema({date:Date,name:String});
// definimos el modelo
var Visitor = mongoose.model("Visitor", schema);

app.get('/', (req, res) => {
  let name = (req.query.name == undefined || req.query.name == '') ? 'Anónimo' : req.query.name
  var visitor = new Visitor({ date: Date.now(), name: name })
  visitor.save(function(err, visitor) {
    if (err) return console.error(err);
    console.log(visitor)
    res.send('<h1>El visitante fue almacenado con éxito</h1>');
  });
});

app.listen(3000, () => console.log('listening 3000'));
