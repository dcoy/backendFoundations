const sqlite = require('sqlite3').verbose();
const db = new sqlite.Database('./db/chinook_sqlite_autoIncrementPKs.sqlite');

const albumQuery = `SELECT ArtistId, Title FROM "Album" LIMIT 10`;

let dbQuery = (query) => {
  db.each(query, (err, row) => {
    if (err) { throw new err; }
    // console.log(row.Title);
    return row.Title;
  });

  db.close();
}



// module.exports.dbQuery = dbQuery(albumQuery);