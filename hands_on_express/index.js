const express = require('express');
const app = express();
const handlebars = require('express-handlebars').create({defaultLayout: 'main'});

app.engine('handlebars', handlebars.engine);
app.set('view engine','handlebars');


app.set('port', process.env.PORT || 3000);

app.get('/', (req, res) => {
  res.render('home');
});

app.get('/beginning', (req, res) => {
  res.render('beginning');
});

app.get('/middle', (req, res) => {
  res.render('middle');
});

app.get('/end', (req, res) => {
  res.render('end');
});

app.use((req, res) => {
  res.status(400);
  res.render('404 - Not Found');
});

app.listen(app.get('port'), () => {
  console.log(`Server startd on http://localhost:${app.get('port')}; press ^C terminate.`);
});