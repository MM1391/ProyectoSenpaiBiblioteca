const conexionDB = require('../services/conexionDB');
var crypto = require('crypto');
//----------------------------------------------------------------------//

//-------------------------------QUERIES--------------------------------//
const INSERTAR_NUEVO_USUARIO = 'INSERT INTO usuarios SET ?';
const OBTENER_TODOS_USUARIOS = 'SELECT * FROM usuarios';
const OBTENER_USUARIO_ID = 'SELECT * FROM usuarios WHERE idUsuario = ?';
const OBTENER_USUARIO_NOMBRE = 'SELECT * FROM usuarios WHERE nombreUsuario = ?';
const EDITAR_USUARIO = 'UPDATE usuarios SET nombreUsuario = ?, contrasena = ?, correo = ?, fotoPerfil = ? WHERE idUsuario = ?';
const BORRAR_USUARIO = 'DELETE FROM usuarios WHERE idUsuario = ?';
//----------------------------------------------------------------------//

//--------------------------------MODELO--------------------------------//
class Usuario {
    constructor(idUsuario, nombreUsuario, contrasena, correo, fotoPerfil) {
        this.idUsuario = idUsuario;
        this.nombreUsuario = nombreUsuario;
        this.contrasena = contrasena;
        this.correo = correo;
        this.fotoPerfil = fotoPerfil;
    }

//----------------------------CREATE USUARIO----------------------------//
    save() {
        const nuevoUsuario = {
            nombreUsuario: this.nombreUsuario,
            contrasena: this.contrasena,
            correo: this.correo,
            fotoPerfil: this.fotoPerfil
        };
        
        return new Promise((resolve, reject) => {
            conexionDB.query(INSERTAR_NUEVO_USUARIO, nuevoUsuario, (error, results, fields) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(new Usuario(nuevoUsuario.nombreUsuario, nuevoUsuario.contrasena, nuevoUsuario.correo,
                        nuevoUsuario.fotoPerfil));
                }
            });
        });
    }
//----------------------------------------------------------------------//

//---------------------------GET ALL USUARIOS---------------------------//
    static obtenerTodosUsuarios() {
        return new Promise(function (resolve, reject) {
            conexionDB.query(OBTENER_TODOS_USUARIOS, function (error, results) {
                if (error) {
                    reject(error);
                } else {
                    try {
                        resolve(results.map((usuario) => {
                            const { idUsuario, nombreUsuario, contrasena, correo, fotoPerfil } = usuario;
                            return new Usuario(idUsuario, nombreUsuario, contrasena, correo, fotoPerfil);
                        }));
                    } catch(err) {
                        reject(err);
                    }                  
                }
            });
        })
    }
//----------------------------------------------------------------------//

//-----------------------------GET USUARIO------------------------------//
    static obtenerUsuarioID(idUsuario) {
        return new Promise(function (resolve, reject) {
            conexionDB.query(OBTENER_USUARIO_ID, [idUsuario], (error, results) =>{
                if (error) {
                    reject(error);
                } else {
                    const { idUsuario, nombreUsuario, contrasena, correo, fotoPerfil } = results[0];
                    resolve(new Usuario(idUsuario, nombreUsuario, contrasena, correo, fotoPerfil));
                }
            });
        })
    }
//----------------------------------------------------------------------//

//----------------------------UPDATE USUARIO----------------------------//
    static editarUsuario(nombreUsuario, contrasena, correo, fotoPerfil, idUsuario) {
        return new Promise(function (resolve, reject) {
            conexionDB.query(EDITAR_USUARIO, [nombreUsuario, contrasena, correo, fotoPerfil, idUsuario], 
                (error, results) =>{
                if (error) {
                    reject(error);
                } else {
                    resolve(
                        {
                            "success":"true",
                            "descripcion": "update con exito"  
                        }
                    );
                }
            });
        })
    }  
//----------------------------------------------------------------------//

//----------------------------DELETE USUARIO----------------------------//
    static borrarUsuario(idUsuario) {
        return new Promise(function (resolve, reject) {
            conexionDB.query(BORRAR_USUARIO, [idUsuario], (error, results) =>{
                if (error) {
                    reject(error);
                }
                resolve();
            });
        })
    }
//----------------------------------------------------------------------//

//--------------------------------LOGIN---------------------------------//
    static login(nombreUsuario, contrasena) {
        return new Promise(function (resolve, reject) {
            conexionDB.query(OBTENER_USUARIO_NOMBRE, [nombreUsuario], (error, results) =>{
                if (results.length <= 0) {
                    reject(error);
                } else {
                    if(crypto.createHash('md5').update(contrasena).digest("hex") == results[0].contrasena){
                        resolve(
                            {
                                "success":"true",
                                "descripcion": "login con exito"  
                            }
                        );
                    } else {
                        resolve(
                            {
                                "success":"false",
                                "descripcion": "login con error"  
                            }
                        );                      
                    }                 
                }
            });
        })
    }
//----------------------------------------------------------------------//

//----------------------------------------------------------------------//
}

//----------------------------------------------------------------------//
module.exports = Usuario;