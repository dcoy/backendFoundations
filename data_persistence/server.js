const express = require('express'),
  exphbs = require('express-handlebars'),
  sqlite = require('sqlite3').verbose(),
  bodyParser = require('body-parser'),
  path = require('path'),
  db = new sqlite.Database('./db/chinook_sqlite_autoIncrementPKs.sqlite');

const app = express();

let hbs = exphbs.create({
  helpers: {
    albumData: (query) => {
      db.each(albumQuery, (err, row) => {
        if (err) { throw err; }
        console.log(row.Title);
        return row;
      });
      db.close();
    },
    artists: () => {
      console.log("test");
    }
  }
});

const albumQuery = `SELECT ArtistId, Title FROM "Album" LIMIT 2`;


app.engine('.hbs', exphbs({
  extname: '.hbs',
  defaultLayout: 'layout',
  layoutsDir: __dirname + '/views/layouts/'
}));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', '.hbs');
app.set('port', process.env.PORT || 3000);

app.get('/', (req, res) => {
  res.render('home', {
    title: 'Home'
  });
});

app.get('/albums', (req, res) => {
  res.render('albums', {
    title: 'Albums',
    helpers: {
      albums: hbs.albumData,
      artists: hbs.artists
    }
  });
  console.log("Rendered albums");
});

app.use((req, res) => {
  res.status(400);
  res.render('404');
});

app.listen(app.get('port'), () => {
  console.log(`Server startd on http://localhost:${app.get('port')}; press ^C terminate.`);
});