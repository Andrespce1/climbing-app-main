// Entrenador.js

class Entrenador {
    constructor(idEnt, nombresEnt, apellidosEnt, cedulaEnt, activoEnt, idPro, idUsu) {
      this.idEnt = idEnt;
      this.nombresEnt = nombresEnt;
      this.apellidosEnt = apellidosEnt;
      this.cedulaEnt = cedulaEnt;
      this.activoEnt = activoEnt;
      this.idPro = idPro;
      this.idUsu = idUsu;
      this.deportista = [];
    }
  }
  
  module.exports = Entrenador;