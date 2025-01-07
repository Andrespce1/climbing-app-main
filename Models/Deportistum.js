// Deportistum.js

class Deportistum {
    constructor(
      idDep,
      nombresDep,
      apellidosDep,
      cedulaDep,
      activoDep,
      idPro,
      idUsu,
      idCat,
      idGen,
      idClub,
      idEnt
    ) {
      this.idDep = idDep;
      this.nombresDep = nombresDep;
      this.apellidosDep = apellidosDep;
      this.cedulaDep = cedulaDep;
      this.activoDep = activoDep;
      this.idPro = idPro;
      this.idUsu = idUsu;
      this.idCat = idCat;
      this.idGen = idGen;
      this.idClub = idClub;
      this.idEnt = idEnt;
      this.deportistaModalidads = [];
      this.detalleCompetencia = [];
      this.detalleCompetenciaDificultads = [];
      this.puntajeBloques = [];
      this.resultadoBloques = [];
    }
  }
  
  module.exports = Deportistum;