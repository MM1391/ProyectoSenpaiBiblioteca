const conexionDB = require('../services/conexionDB');
//----------------------------------------------------------------------//

//-------------------------------QUERIES--------------------------------//
const AGREGAR_CARTA = 'INSERT INTO cartas SET ?';
const OBTENER_TODAS_CARTAS = 'SELECT * FROM cartas';
const OBTENER_CARTA_ID = 'SELECT * FROM cartas WHERE idCarta = ?';
const EDITAR_CARTA = 'UPDATE cartas SET nombreCarta = ?, tipo = ?, enColeccion = ?, img = ?, firstEd = ?, firstEdStatus = ?, region = ? WHERE idCarta = ?';
const BORRAR_CARTA = 'DELETE FROM cartas WHERE idCarta = ?';
//----------------------------------------------------------------------//

//--------------------------------MODELO--------------------------------//
class Carta {
    constructor(idCarta, nombreCarta, tipo, enColeccion, img, firstEd, firstEdStatus, region) {
        this.idCarta = idCarta;
        this.nombreCarta = nombreCarta;
        this.tipo = tipo;
        this.enColeccion = enColeccion;
        this.img = img;
        this.firstEd = firstEd;
        this.firstEdStatus = firstEdStatus;
        this.region = region;
    }

//-----------------------------CREATE CARTA-----------------------------//
    save() {
        const nuevaCarta = {
            nombreCarta: this.nombreCarta,
            tipo: this.tipo,
            enColeccion: this.enColeccion,
            img: this.img,
            firstEd: this.firstEd,
            firstEdStatus: this.firstEdStatus,
            region: this.region
        };

        return new Promise((resolve, reject) => {
            conexionDB.query(AGREGAR_CARTA, nuevaCarta, (error, results, fields) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(new Carta(nuevaCarta.nombreCarta, nuevaCarta.tipo, nuevaCarta.enColeccion,
                        nuevaCarta.img, nuevaCarta.firstEd, nuevaCarta.firstEdStatus, nuevaCarta.region));
                }
            });
        });
    }
//----------------------------------------------------------------------//

//----------------------------GET ALL CARTAS----------------------------//
    static obtenerTodasCartas() {
        return new Promise(function (resolve, reject) {
            conexionDB.query(OBTENER_TODAS_CARTAS, function (error, results) {
                if (error) {
                    reject(error);
                } else {
                    try {
                        resolve(results.map((carta) => {
                            const { idCarta, nombreCarta, tipo, enColeccion, img, firstEd, 
                                firstEdStatus, region } = carta;
                            return new Carta(idCarta, nombreCarta, tipo, enColeccion, img, firstEd, 
                                firstEdStatus, region);
                        }));
                    } catch(err) {
                        reject(err);
                    }
                }
            });
        })
    }
//----------------------------------------------------------------------//

//------------------------------GET CARTA-------------------------------//
    static obtenerCartaID(idCarta) {
        return new Promise(function (resolve, reject) {
            conexionDB.query(OBTENER_CARTA_ID, [idCarta], (error, results) =>{
                if (error) {
                    reject(error);
                } else {
                    const { idCarta, nombreCarta, tipo, enColeccion, img, firstEd, 
                        firstEdStatus, region } = results[0];
                    resolve(new Carta(idCarta, nombreCarta, tipo, enColeccion, img, firstEd, 
                        firstEdStatus, region));
                }
            });
        })
    }
//----------------------------------------------------------------------//

//-----------------------------UPDATE CARTA-----------------------------//
    static editarCarta(nombreCarta, tipo, enColeccion, img, firstEd, firstEdStatus, region, idCarta) {
        return new Promise(function (resolve, reject) {
            conexionDB.query(EDITAR_CARTA, [nombreCarta, tipo, enColeccion, img, firstEd, 
                firstEdStatus, region, idCarta], (error, results) =>{
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

//-----------------------------DELETE CARTA-----------------------------//
    static borrarCarta(idCarta) {
        return new Promise(function (resolve, reject) {
            conexionDB.query(BORRAR_CARTA, [idCarta], (error, results) =>{
                if (error) {
                    reject(error);
                }
                resolve();
            });
        })
    }
//----------------------------------------------------------------------//
}

//----------------------------------------------------------------------//
module.exports = Carta;