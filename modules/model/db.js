const con = new Mongo();
const db = con.getDB('apps');
printjson(db.movies.find({}));
