var mysql = require('mysql');

var conexion = mysql.createConnection({
    host: "127.0.0.1",
    port: 3306,
    user: "root",
    password: "password",
    database: "proyectobiblioteca"
  });

  conexion.connect(function(err) {
    if (err) throw err;
    console.log("Conexión establecida");
});

module.exports = conexion;