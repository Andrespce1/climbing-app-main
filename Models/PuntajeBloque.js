// PuntajeBloque.js

class PuntajeBloque {
    constructor(
      idBloPts,
      idCom,
      idDep,
      numeroBloque,
      intentosTops,
      intentosZonas,
      etapa
    ) {
      this.idBloPts = idBloPts;
      this.idCom = idCom;
      this.idDep = idDep;
      this.numeroBloque = numeroBloque;
      this.intentosTops = intentosTops;
      this.intentosZonas = intentosZonas;
      this.etapa = etapa;
    }
  }
  
  module.exports = PuntajeBloque;