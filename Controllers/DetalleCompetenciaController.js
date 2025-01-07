import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { notification } from 'react-notifyify';
import APIConsumer from './APIConsumer';
import _ from 'lodash';
import DinkToPdf from 'dink-to-pdf';
import 'html2canvas';

class DetalleCompetenciaController {
  constructor(configuration, converter) {
    this.apiUrl = configuration["urlBase"].ToString() + "DetalleCompetencia/";
    this.ViewBag.ReturnTo = "index";
    this._converter = converter;
  }

  [Authorize(Roles = "Administrador,Juez")]
  Index() {
    const data = APIConsumer<DetalleCompetencium>.Select(this.apiUrl);
    return View(data);
  }

  listaDeportistas() {
    const deportistas = APIConsumer<Deportistum>.Select(this.apiUrl.Replace("DetalleCompetencia", "Deportista"));
    const lista = deportistas.Select(f => new SelectListItem
    {
      Value = f.IdDep.ToString(),
      Text = f.NombresDep + " " + f.ApellidosDep
    }).ToList();
    return lista;
  }

  listaCompetencias() {
    const deportistas = APIConsumer<Competencium>.Select(this.apiUrl.Replace("DetalleCompetencia", "Competencia"));
    const lista = deportistas.Select(f => new SelectListItem
    {
      Value = f.IdCom.ToString(),
      Text = f.NombreCom
    }).ToList();
    return lista;
  }

  [Authorize(Roles = "Administrador,Juez")]
  Details(int id) {
    const data = APIConsumer<DetalleCompetencium>.SelectOne(this.apiUrl + id.ToString());
    return View(data);
  }

  Create(string? returnTo) {
    ViewBag.ReturnTo = returnTo;
    ViewBag.listaDeportistas = this.listaDeportistas();
    ViewBag.listaCompetencias = this.listaCompetencias();
    return View();
  }

  [Authorize(Roles = "Administrador,Juez")]
  [HttpPost]
  Create(DetalleCompetencium detalle, string returnTo) {
    try {
      APIConsumer<DetalleCompetencium>.Insert(this.apiUrl, detalle);
      if (returnTo == null) {
        return RedirectToAction(nameof(Index));
        //return RedirectToAction("Edit", "Competencia", new { id = detalle.IdCom });
      } else {
        //return RedirectToAction(nameof(Create));
        return RedirectToAction("Edit", "Competencia", new { id = detalle.IdCom });
      }
    } catch (Exception ex) {
      ModelState.AddModelError("", ex.Message);
      return View(detalle);
    }
  }

  [Authorize(Roles = "Administrador,Juez")]
  [HttpGet]
  Edit(int id, string? returnTo) {
    ViewBag.listaDeportistas = this.listaDeportistas();
    ViewBag.listaCompetencias = this.listaCompetencias();
    ViewBag.ReturnTo = returnTo;
    const data = APIConsumer<DetalleCompetencium>.SelectOne(this.apiUrl + id.ToString());
    return View(data);
  }

  [Authorize(Roles = "Administrador,Juez")]
  [HttpPost]
  Edit(int id, DetalleCompetencium detalle, string returnTo) {
    try {
      APIConsumer<DetalleCompetencium>.Update(this.apiUrl + id.ToString(), detalle);
      if (returnTo == null) {
        return RedirectToAction(nameof(Index));
      } else {
        return RedirectToAction("Edit", "Competencia", new { id = detalle.IdCom });
      }
    } catch (Exception ex) {
      ModelState.AddModelError("", ex.Message);
      return View(detalle);
    }
  }

  [Authorize(Roles = "Administrador,Juez")]
  [HttpPost]
  Resultados(int id, DetalleCompetencium detalle, string returnTo) {
    try {
      APIConsumer<DetalleCompetencium>.Update(this.apiUrl + id.ToString(), detalle);
      if (returnTo == null) {
        return RedirectToAction(nameof(Index));
      } else {
        return RedirectToAction("Resultados", "Competencia");
      }
    } catch (Exception ex) {
      ModelState.AddModelError("", ex.Message);
      return View(detalle);
    }
  }

  [Authorize(Roles = "Administrador,Juez")]
  [HttpGet]
  Delete(int id, string? returnTo) {
    const data = APIConsumer<DetalleCompetencium>.SelectOne(this.apiUrl + id.ToString());
    ViewBag.ReturnTo = returnTo;
    return View(data);
  }

  [Authorize(Roles = "Administrador,Juez")]
  [HttpPost]
  Delete(int id, DetalleCompetencium detalle, string returnTo) {
    try {
      APIConsumer<DetalleCompetencium>.Delete(this.apiUrl + id.ToString());
      return RedirectToAction("Resultados", "Competencia");
    } catch {
      return View(detalle);
    }
  }

  public IActionResult VistaPDFListaResultados(int competencia) {
    const viewBox = document.getElementById('viewBox');
    const canvas = document.getElementById('canvas');
    html2canvas(viewBox, {
      onrendered: (canvas) => {
        const pdf = new DinkToPdf({
          path: `.${this.apiUrl}VistaPDFListaResultados?competencia=${competencia}`,
          document: canvas,
          width: 800,
          height: 600
        });
        pdf.render();
      }
    });
  }

  public IActionResult MostrarPDFNuevaPagina(int competencia) {
    const paginaActual = document.location.pathname;
    const urlPagina = document.location.search;
    urlPagina = urlPagina.replace(paginaActual, '');
    urlPagina = `${urlPagina}/DetalleCompetencia/VistaPDFListaResultados?competencia=${competencia}`;
    const pdf = new DinkToPdf({
      path: `.${this.apiUrl}VistaPDFListaResultados?competencia=${competencia}`,
      document: document.getElementById('viewBox'),
      width: 800,
      height: 600
    });
    pdf.render();
    return File(pdf.render(), 'application/pdf');
  }

  public IActionResult VistaPDFListaResultadosFinal(int competencia) {
    const viewBox = document.getElementById('viewBox');
    const canvas = document.getElementById('canvas');
    html2canvas(viewBox, {
      onrendered: (canvas) => {
        const pdf = new DinkToPdf({
          path: `.${this.apiUrl}VistaPDFListaResultadosFinal?competencia=${competencia}`,
          document: canvas,
          width: 800,
          height: 600
        });
        pdf.render();
      }
    });
    return View();
  }

  public IActionResult MostrarPDFNuevaPaginaFinal(int competencia) {
    const paginaActual = document.location.pathname;
    const urlPagina = document.location.search;
    urlPagina = urlPagina.replace(paginaActual, '');
    urlPagina = `${urlPagina}/DetalleCompetencia/VistaPDFListaResultadosFinal?competencia=${competencia}`;
    const pdf = new DinkToPdf({
      path: `.${this.apiUrl}VistaPDFListaResultadosFinal?competencia=${competencia}`,
      document: document.getElementById('viewBox'),
      width: 800,
      height: 600
    });
    pdf.render();
    return File(pdf.render(), 'application/pdf');
  }
}

export default DetalleCompetenciaController;