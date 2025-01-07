// VistaCompetencium.js

class VistaCompetencium {
    constructor(
      idCom,
      nombreCom,
      fechaInicioCom,
      fechaFinCom,
      activoCom,
      genero,
      nombreDelJuez,
      nombreCategoria,
      descripcionModalidad,
      nombreDeSede
    ) {
      this.idCom = idCom;
      this.nombreCom = nombreCom;
      this.fechaInicioCom = fechaInicioCom;
      this.fechaFinCom = fechaFinCom;
      this.activoCom = activoCom;
      this.genero = genero;
      this.nombreDelJuez = nombreDelJuez;
      this.nombreCategoria = nombreCategoria;
      this.descripcionModalidad = descripcionModalidad;
      this.nombreDeSede = nombreDeSede;
    }
  }
  
  module.exports = VistaCompetencium;