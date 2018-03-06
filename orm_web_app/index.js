const express = require('express'),
      exphbs = require('express-handlebars'),
      path = require('path'),
      app = express(),
      port = process.env.PORT || 3000;

const Sequelize = require("sequelize"),
      sequelize = new Sequelize("music", "michael", null, {
  host: 'localhost',
  dialect: 'sqlite',
  storage: './db/chinook_sqlite_autoIncrementPKs.sqlite'
});

const Artist = sequelize.define(
  "Artist",
  {
    ArtistId: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    Name: Sequelize.STRING
  },
  {
    freezeTableName: true,
    timestamps: false
  }
);

const Album = sequelize.define(
  "Album",
  {
    AlbumId: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    ArtistId: Sequelize.INTEGER,
    Title: Sequelize.STRING
  },
  {
    freezeTableName: true,
    timestamps: false
  }
);

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', '.hbs');

app.engine('.hbs', exphbs({
  extname: '.hbs',
  defaultLayout: 'layout',
  layoutsDir: __dirname + '/views/layouts/'
}));

app.get('/albums', (req, res) => {
  sequelize.query(`
    SELECT Title, Name
    FROM Album
    INNER JOIN Artist
    USING (ArtistId)
    LIMIT 10`,
  { model: Album, raw: true }
  ).then(albums => {
    res.render('albums', {albums});
    console.log(albums)
  });
});

app.listen(port, () => {
  console.log(`Server startd on http://localhost:${app.get('port')}; press CTRL-C terminate.`);
});