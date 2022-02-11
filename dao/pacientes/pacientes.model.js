const getDb = require('../mongodb');
let db = null;
class Pacientes {
  collection = null;
  constructor() {
    getDb()
    .then( (database) => {
      db = database;
      this.collection = db.collection('Pacientes');
      if (process.env.MIGRATE === 'true') {
        /*const createStatement = 'CREATE TABLE IF NOT EXISTS pacientes (id INTEGER PRIMARY KEY AUTOINCREMENT, identidad TEXT, nombre TEXT, apellidos TEXT, email TEXT, telefono TEXT);';
        db.run(createStatement);*/
      }
    })
    .catch((err) => { console.error(err)});
  }

  async new ( nombres, apellidos, identidad, telefono, correo) {
    /*return new Promise( (accept, reject)=> {
      db.run(
        'INSERT INTO pacientes (identidad, nombre, apellidos, email, telefono) VALUES (?, ?, ?, ?, ?);',
        [identidad, nombres, apellidos, correo, telefono],
        (err, rslt)=>{
          if(err) {
            console.error(err);
            reject(err);
          }
          accept(rslt);
        }
      );
    });*/

    const newPaciente = {
      nombres,
      apellidos,
      identidad,
      telefono,
      correo
    };
    const rslt = await this.collection.insertOne(newPaciente);
    return rslt
  }

  getAll () {
    /*return new Promise ( (accept, reject) => {
      /*db.all('SELECT * from pacientes;', (err, rows) => {
        if(err){
          console.error(err);
          reject(err);
        } else {
          accept(rows);
        }
      });
    });*/
  }

  getById(id) {
    /*return new Promise((accept, reject) => {
      db.get(
        'SELECT * from pacientes where id=?;',
        [id],
        (err, row) => {
        if (err) {
          console.error(err);
          reject(err);
        } else {
          accept(row);
        }
      });
    });*/
  }

  updateOne (id, nombre, apellidos, identidad, telefono, correo) {
   /* return new Promise( (accept, reject) =>{
      const sqlUpdate = 'UPDATE pacientes set nombre = ?,apellidos = ?, telefono = ?, identidad = ?, email = ? where id = ?';
      db.run(
        sqlUpdate,
        [nombre, apellidos, telefono, identidad, correo, id],
        function (err) {
          if(err){
            reject(err);
          }
          else{
            accept(this);
          }
        }
      );
    });*/
  }

  deleteOne (id) {
    /*return new Promise( (accept, reject) =>{
      const sqlDelete = 'DELETE FROM pacientes where id=?';
      db.run(
        sqlDelete,
        [id],
        function (err) {
          if(err){
            reject(err);
          }
          else{
            accept(this);
          }
        }
      );
    });*/
  }
}

module.exports = Pacientes;
