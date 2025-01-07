import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { notification } from 'react-notifyify';
import APIConsumer from './APIConsumer';
import _ from 'lodash';
import DinkToPdf from 'dink-to-pdf';
import 'html2canvas';

class HomeController {
  constructor() {
    this._logger = this._getLogger('HomeController');
  }

  public Index() {
    return View();
  }

  [Authorize(Roles = "Administrador,Juez,Entrenador")]
  Resultados() {
    this._logger.info('Llamada al método Resultados');
    BasicNotification("Trabajando en ello", NotificationType.Info, "NO DISPONIBLE");
    return View();
  }

  [Authorize(Roles = "Administrador,Juez")]
  Competencias() {
    this._logger.info('Llamada al método Competencias');
    BasicNotification("Trabajando en ello", NotificationType.Info, "NO DISPONIBLE");
    return View();
  }

  public Privacy() {
    return View();
  }

  public Error() {
    return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? this._getTraceIdentifier() });
  }
}

export default HomeController;