// Usuario.js

class Usuario {
    constructor(
      idUsu,
      nombreUsu,
      claveUsu,
      fechaCreacion,
      rolesUsu,
      activoUsu
    ) {
      this.idUsu = idUsu;
      this.nombreUsu = nombreUsu;
      this.claveUsu = claveUsu;
      this.fechaCreacion = fechaCreacion;
      this.rolesUsu = rolesUsu;
      this.activoUsu = activoUsu;
      this.deportista = [];
      this.entrenadors = [];
      this.juezs = [];
    }
  }
  
  module.exports = Usuario;