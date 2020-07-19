var mysql = require('mysql');

var conexionDB = mysql.createConnection({
    host: "127.0.0.1",
    port: 3306,
    user: "root",
    password: "password",
    database: "nuevabibliosenpai"
  });

  conexionDB.connect(function(err) {
    if (err) throw err;
    console.log("Conexión establecida");
});

module.exports = conexionDB;