// VistaPuntajesDeportista.js

class VistaPuntajesDeportista {
    constructor(
      idVw,
      idCom,
      idDep,
      nombreDep,
      etapa,
      intentosTops,
      topsRealizados,
      intentosZonas,
      zonasRealizadas
    ) {
      this.idVw = idVw;
      this.idCom = idCom;
      this.idDep = idDep;
      this.nombreDep = nombreDep;
      this.etapa = etapa;
      this.intentosTops = intentosTops;
      this.topsRealizados = topsRealizados;
      this.intentosZonas = intentosZonas;
      this.zonasRealizadas = zonasRealizadas;
    }
  }
  
  module.exports = VistaPuntajesDeportista;