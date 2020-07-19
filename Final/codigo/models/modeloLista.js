const conexionDB = require('../services/conexionDB');
//----------------------------------------------------------------------//

//-------------------------------QUERIES--------------------------------//
const INSERTAR_NUEVA_LISTA = 'INSERT INTO listas SET ?';
const OBTENER_TODAS_LISTAS = 'SELECT * FROM listas';
const OBTENER_LISTA_ID = 'SELECT * FROM listas WHERE idLista = ?';
const EDITAR_LISTA = 'UPDATE listas SET nombreLista = ? WHERE idLista = ?';
const BORRAR_LISTA = 'DELETE FROM listas WHERE idLista = ?';
//----------------------------------------------------------------------//

//--------------------------------MODELO--------------------------------//
class Lista {
    constructor(idLista, nombreLista) {
        this.idLista = idLista;
        this.nombreLista = nombreLista;
    }

//-----------------------------CREATE LISTA-----------------------------//
    save() {
        const nuevaLista = {
            nombreLista: this.nombreLista,
        };

        return new Promise((resolve, reject) => {
            conexionDB.query(INSERTAR_NUEVA_LISTA, nuevaLista, (error, results, fields) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(new Lista(nuevaLista.nombreLista));
                }
            });
        });
    }
//----------------------------------------------------------------------//

//----------------------------GET ALL LISTAS----------------------------//
    static obtenerTodasListas() {
        return new Promise(function (resolve, reject) {
            conexionDB.query(OBTENER_TODAS_LISTAS, function (error, results) {
                if (error) {
                    reject(error);
                } else {
                    try {
                        resolve(results.map((lista) => {
                            const { idLista, nombreLista } = lista;
                            return new Lista(idLista, nombreLista);
                        }));
                    } catch(err) {
                        reject(err);
                    }               
                }
            });
        })
    }
//----------------------------------------------------------------------//

//------------------------------GET LISTA-------------------------------//
    static obtenerListaID(idLista) {
        return new Promise(function (resolve, reject) {
            conexionDB.query(OBTENER_LISTA_ID, [idLista], (error, results) =>{
                if (error) {
                    reject(error);
                } else {
                    const { idLista, nombreLista } = results[0];
                    resolve(new Lista(idLista, nombreLista));
                }
            });
        })
    }
//----------------------------------------------------------------------//

//-----------------------------UPDATE LISTA-----------------------------//
    static editarLista(nombreLista, idLista) {
        return new Promise(function (resolve, reject) {
            conexionDB.query(EDITAR_LISTA, [nombreLista, idLista], (error, results) =>{
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

//-----------------------------DELETE LISTA-----------------------------//
    static borrarLista(idLista) {
        return new Promise(function (resolve, reject) {
            conexionDB.query(BORRAR_LISTA, [idLista], (error, results) =>{
                if (error) {
                    reject(error);
                }
                resolve();
            });
        })
    }
//----------------------------------------------------------------------//

//----------------------------------------------------------------------//
}

//----------------------------------------------------------------------//
module.exports = Lista;