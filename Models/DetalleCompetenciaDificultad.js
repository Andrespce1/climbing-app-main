// DetalleCompetenciaDificultad.js

class DetalleCompetenciaDificultad {
    constructor(
      idDetalleDificultad,
      puesto,
      clas1Res,
      clas2Res,
      puestoInicialRes,
      finalRes,
      idDep,
      idCom,
      tiempoRes
    ) {
      this.idDetalleDificultad = idDetalleDificultad;
      this.puesto = puesto;
      this.clas1Res = clas1Res;
      this.clas2Res = clas2Res;
      this.puestoInicialRes = puestoInicialRes;
      this.finalRes = finalRes;
      this.idDep = idDep;
      this.idCom = idCom;
      this.tiempoRes = tiempoRes;
    }
  }
  
  module.exports = DetalleCompetenciaDificultad;