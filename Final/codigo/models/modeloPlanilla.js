const conexionDB = require('../services/conexionDB');
//----------------------------------------------------------------------//

//-------------------------------QUERIES--------------------------------//
const INSERTAR_CARTA_EN_LISTA = 'INSERT INTO planilla SET ?';
const OBTENER_CARTAS_DE_LISTA = 'SELECT * FROM planilla WHERE idListaAsoc = ?';
//----------------------------------------------------------------------//

//--------------------------------MODELO--------------------------------//
class Planilla {
    constructor(idRegistro, idCartaAsoc, idListaAsoc) {
        this.idRegistro = idRegistro;
        this.idCartaAsoc = idCartaAsoc;
        this.idListaAsoc = idListaAsoc;
    }

//------------------------AGREGAR CARTA A LISTA-------------------------//
    save() {
        const cartaEnLista = {
            idCartaAsoc: this.idCartaAsoc,
            idListaAsoc: this.idListaAsoc,
        };

        return new Promise((resolve, reject) => {
            conexionDB.query(INSERTAR_CARTA_EN_LISTA, cartaEnLista, (error, results, fields) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(
                        {
                            "success":"true",
                            "descripcion": "agregada con exito"  
                        }
                    );
                }
            });
        });
    }
//----------------------------------------------------------------------//

//----------------------------GET ALL CARTAS----------------------------//
static obtenerCartasIDLista(idListaAsoc) {
    return new Promise(function (resolve, reject) {
        conexionDB.query(OBTENER_CARTAS_DE_LISTA, [idListaAsoc], function (error, results) {
            if (error) {
                reject(error);
            } else {
                try {
                    resolve(results.map((planilla) => {                        
                        const { idRegistro, idCartaAsoc, idListaAsoc } = planilla;
                        console.log(planilla);
                        return new Planilla(idRegistro, idCartaAsoc, idListaAsoc);
                    }));
                } catch(err) {
                    reject(err);
                }
            }
        });
    })
}
//----------------------------------------------------------------------//
}

//----------------------------------------------------------------------//
module.exports = Planilla;