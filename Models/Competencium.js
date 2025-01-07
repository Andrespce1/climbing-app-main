// Competencium.js

class Competencium {
    constructor(
      idCom,
      nombreCom,
      fechaInicioCom,
      fechaFinCom,
      activoCom,
      idGen,
      idJuez,
      idCat,
      idSede,
      idMod
    ) {
      this.idCom = idCom;
      this.nombreCom = nombreCom;
      this.fechaInicioCom = fechaInicioCom;
      this.fechaFinCom = fechaFinCom;
      this.activoCom = activoCom;
      this.idGen = idGen;
      this.idJuez = idJuez;
      this.idCat = idCat;
      this.idSede = idSede;
      this.idMod = idMod;
      this.detalleCompetencia = [];
      this.detalleCompetenciaDificultads = [];
      this.puntajeBloques = [];
      this.resultadoBloques = [];
    }
  }
  
  module.exports = Competencium;