const express = require("express");
const app = express();

app.get('/', (req, res) => {
  res.send('You successfully created a GET route!');
});

app.use((require("body-parser")()));

app.post('/fullstory', (req, res) => {
  console.log(`Name: ${req.body.name}`);
  console.log(`Animal: ${req.body.animal}`);
  console.log(`Years: ${req.body.years}`);
  res.redirect(303, '/success');
});

app.put('/', (req, res) => {
  res.send('You successfully created a PUT route!');
});

app.delete('/', (req, res) => {
  res.send('You successfully created a DELETE route!');
});

app.listen(3000, () => {
  console.log('Server created on port 3000');
});