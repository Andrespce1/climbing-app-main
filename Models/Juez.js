// Juez.js

class Juez {
    constructor(
      idJuez,
      nombresJuez,
      apellidosJuez,
      cedulaJuez,
      principalJuez,
      activoJuez,
      idPro,
      idUsu
    ) {
      this.idJuez = idJuez;
      this.nombresJuez = nombresJuez;
      this.apellidosJuez = apellidosJuez;
      this.cedulaJuez = cedulaJuez;
      this.principalJuez = principalJuez;
      this.activoJuez = activoJuez;
      this.idPro = idPro;
      this.idUsu = idUsu;
      this.competencia = [];
    }
  }
  
  module.exports = Juez;