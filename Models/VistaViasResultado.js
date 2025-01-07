// VistaViasResultado.js

class VistaViasResultado {
    constructor(
      idCompe,
      puestoFinal,
      puestoClasificacion,
      deportista,
      clasificacion1,
      clasificacion2,
      final,
      tiempo
    ) {
      this.idCompe = idCompe;
      this.puestoFinal = puestoFinal;
      this.puestoClasificacion = puestoClasificacion;
      this.deportista = deportista;
      this.clasificacion1 = clasificacion1;
      this.clasificacion2 = clasificacion2;
      this.final = final;
      this.tiempo = tiempo;
    }
  }
  
  module.exports = VistaViasResultado;