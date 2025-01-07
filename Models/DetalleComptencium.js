// DetalleCompetencium.js

class DetalleCompetencium {
    constructor(
      idDetalle,
      puesto,
      clasRes,
      octavosRes,
      cuartosRes,
      semiRes,
      finalRes,
      idDep,
      idCom
    ) {
      this.idDetalle = idDetalle;
      this.puesto = puesto;
      this.clasRes = clasRes;
      this.octavosRes = octavosRes;
      this.cuartosRes = cuartosRes;
      this.semiRes = semiRes;
      this.finalRes = finalRes;
      this.idDep = idDep;
      this.idCom = idCom;
    }
  }
  
  module.exports = DetalleCompetencium;