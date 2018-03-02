const express = require("express");
const app = express();
const bodyParser = require('body-parser');

app.get("/", (req, res) => {
  console.log('GET was called');
  res.status(200).send('GET is used to read information');
  console.log(`Header ID: 'Payload-Data', Value: ${req.get('Payload-Data')}`);
});

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.post("/", (req, res) => {
  console.log('POST was called');
  res.status(200).send('Data can be created using this method (POST).');
  console.log(`Header ID: 'Payload-Data', Value: ${req.get('Payload-Data')}`);
});

app.put("/", (req, res) => {
  console.log('PUT was called');
  res.status(200).send('Use this (PUT) to update information');
  console.log(`Header ID: 'Payload-Data', Value: ${req.get('Payload-Data')}`);
});

app.delete("/", (req, res) => {
  console.log('DELETE was called');
  res.status(403).send('Only use DELETE to remove the specified target');
  console.log(`Header ID: 'Payload-Data', Value: ${req.get('Payload-Data')}`);
});

app.listen(3000, () => {
  console.log('Express server created on port 3000');
});