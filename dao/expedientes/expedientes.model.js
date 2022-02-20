const ObjectId = require('mongodb').ObjectId;
const getDb = require('../mongodb');
let db = null;
class Expedientes {

  constructor() {
    getDb()
      .then((database) => {
        db = database;
        this.collection = db.collection('Expedientes');
        if (process.env.MIGRATE === 'true') {
          // Por Si se ocupa algo
        }
      })
      .catch((err) => { console.error(err) });
  }


  async new ( identidad, fecha, descripcion,observacion, registros, ultimaActualizacion ) {
    /*return new Promise( (accept, reject)=> {
      db.run(
        'INSERT INTO expedientes (identidad, fecha, descripcion, observacion, registros, ultimaActualizacion ) VALUES (?, ?, ?, ?, ?, ?);',
        [identidad, fecha, descripcion, observacion, registros, ultimaActualizacion],
        (err, rslt)=>{
          if(err) {
            console.error(err);
            reject(err);
          }
          accept(rslt);
        }
      );
    });*/

    const newExpediente ={
      identidad,
      fecha,
      descripcion,
      observacion,
      registros,
      ultimaActualizacion
    };
    const rslt = await this.collection.insertOne(newExpediente);
    return rslt;
  }

  async getFaceted(page, items, filter = {}) {
    const cursor = this.collection.find(filter);
    const totalItems = await cursor.count();
    cursor.skip((page -1) * items);
    cursor.limit(items);
    const resultados = await cursor.toArray();
    return {
      totalItems,
      page,
      items,
      totalPages: (Math.ceil(totalItems / items)),
      resultados
    };
  }
  
  async getAll () {
    /*return new Promise ( (accept, reject) => {
      db.all('SELECT * from expedientes;', (err, rows) => {
        if(err){
          console.error(err);
          reject(err);
        } else {
          accept(rows);
        }
      });
    });*/

    const cursor = this.collection.find({});
    const documents = await cursor.toArray();
    return documents;
  }

  async getById(id) {
    /* return new Promise((accept, reject) => {
      db.get(
        'SELECT * from expedientes where id=?;',
        [id],
        (err, row) => {
        if (err) {
          console.error(err);
          reject(err);
        } else {
          accept(row);
        }
      });
    }); */

    const _id = new ObjectId(id);
    const filter = {_id};
    console.log(filter);
    const myDocument = await this.collection.findOne(filter);
    return myDocument;
  }

  async updateOne (id, identidad, fecha, descripcion,observacion, registros, ultimaActualizacion) {
    /* return new Promise( (accept, reject) =>{
      const sqlUpdate = 'UPDATE expedientes set identidad=?, fecha=?, descripcion=?, observacion=?, registros=?, ultimaActualizacion=? where id = ?';
      db.run(
        sqlUpdate,
        [identidad,fecha, descripcion, observacion,  registros, ultimaActualizacion, id],
        function (err) {
          if(err){
            reject(err);
          }
          else{
            accept(this);
          }
        }
      );
    }); */

    const filter = {_id: new ObjectId(id)};
    const updateCmd = {
      '$set':{
        identidad,
      fecha,
      descripcion,
      observacion,
      registros,
      ultimaActualizacion
      }
    };
    return await this.collection.updateOne(filter, updateCmd);
  }

  async deleteOne (id) {
    /* return new Promise( (accept, reject) =>{
      const sqlDelete = 'DELETE FROM expedientes where id=?';
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
    }); */

    const _id = new ObjectId(id);
    const filter = {_id};
    console.log(filter);
    const myDocument = await this.collection.deleteOne(filter);
    return myDocument;
  }
}

module.exports = Expedientes;
