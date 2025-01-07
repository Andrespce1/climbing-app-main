import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { notification } from 'react-notifyify';
import APIConsumer from './APIConsumer';
import _ from 'lodash';
import DinkToPdf from 'dink-to-pdf';
import 'html2canvas';

class DificultadController {
  constructor(configuration, converter) {
    this.apiUrl = configuration["urlBase"].ToString() + "Dificultad/";
    this.ViewBag.ReturnTo = "index";
    this._converter = converter;
  }

  [Authorize(Roles = "Administrador,Juez")]
  Index() {
    const data = APIConsumer<DetalleCompetenciaDificultad>.Select(this.apiUrl);
    return View(data);
  }

  listaDeportistas() {
    const deportistas = APIConsumer<Deportistum>.Select(this.apiUrl.Replace("Dificultad", "Deportista"));
    const lista = deportistas.Select(f => new SelectListItem
    {
      Value = f.IdDep.ToString(),
      Text = f.NombresDep + " " + f.ApellidosDep
    }).ToList();
    return lista;
  }

  listaCompetencias() {
    const deportistas = APIConsumer<Competencium>.Select(this.apiUrl.Replace("Dificultad", "Competencia"));
    const lista = deportistas.Select(f => new SelectListItem
    {
      Value = f.IdCom.ToString(),
      Text = f.NombreCom
    }).ToList();
    return lista;
  }

  [Authorize(Roles = "Administrador,Juez")]
  Details(int id) {
    const data = APIConsumer<DetalleCompetenciaDificultad>.SelectOne(this.apiUrl + id.ToString());
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
  Create(DetalleCompetenciaDificultad detalle, string returnTo) {
    try {
      APIConsumer<DetalleCompetenciaDificultad>.Insert(this.apiUrl, detalle);
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
    const data = APIConsumer<DetalleCompetenciaDificultad>.SelectOne(this.apiUrl + id.ToString());
    return View(data);
  }

  [Authorize(Roles = "Administrador,Juez")]
  [HttpPost]
  Edit(int id, DetalleCompetenciaDificultad detalle, string returnTo) {
    try {
      APIConsumer<DetalleCompetenciaDificultad>.Update(this.apiUrl + id.ToString(), detalle);
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
  Resultados(int id, DetalleCompetenciaDificultad detalle, string returnTo) {
    try {
      APIConsumer<DetalleCompetenciaDificultad>.Update(this.apiUrl + id.ToString(), detalle);
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
    const data = APIConsumer<DetalleCompetenciaDificultad>.SelectOne(this.apiUrl + id.ToString());
    ViewBag.ReturnTo = returnTo;
    return View(data);
  }

  [Authorize(Roles = "Administrador,Juez")]
  [HttpPost]
  Delete(int id, DetalleCompetenciaDificultad detalle, string returnTo) {
    try {
      APIConsumer<DetalleCompetenciaDificultad>.Delete(this.apiUrl + id.ToString());
      return RedirectToAction("Resultados", "Competencia");
    } catch {
      return View();
    }
  }

  public FileResult ExportarExcel(int id) {
    const detalles = APIConsumer<DetalleCompetenciaDificultad>.Select(this.apiUrl).Where(f => f.IdCom == id).ToList();
    const dataTable = new DataTable();
    using (const SqlConnection = new SqlConnection("Data Source=MSI;Initial Catalog=ProyectoFDI.v2;Integrated Security=True;Connect Timeout=30;Encrypt=False;TrustServerCertificate=False;ApplicationIntent=ReadWrite;MultiSubnetFailover=False"))
    {
      const StringBuilder = new StringBuilder();
      StringBuilder.AppendLine("select dt.puesto as PUESTO_FINAL, dt.puesto_inicial_res as PUESTO_CLASIFICACION," +
        "CONCAT(dp.nombres_dep,' ',dp.apellidos_dep) as DEPORTISTA," +
        "dt.clas1_res as CLASIFICACION_1, dt.clas2_res as CLASIFICACION_2, dt.final_res as FINAL " +
        "from detalle_competencia_dificultad dt INNER JOIN deportista dp on dt.id_dep=dp.id_dep " +
        "where id_com = " + id + "GROUP BY dt.puesto, dt.puesto_inicial_res, dp.nombres_dep, dp.apellidos_dep," +
        "dt.clas1_res, dt.clas2_res, dt.final_res ORDER BY dt.puesto");
      const SqlCommand = new SqlCommand(StringBuilder.ToString(), const SqlConnection);
      const SqlCommandType = CommandType.Text;
      const SqlConnection = new SqlConnection("Data Source=MSI;Initial Catalog=ProyectoFDI.v2;Integrated Security=True;Connect Timeout=30;Encrypt=False;TrustServerCertificate=False;ApplicationIntent=ReadWrite;MultiSubnetFailover=False");
      const da = new SqlDataAdapter(S SqlCommand, const SqlConnection);
      const da.Fill(const dataTable);
    }
    const dataTable.TableName = "Reporte Competencia";
    const libro = new XLWorkbook();
    const hoja = libro.Worksheets.Add(const dataTable);
    const hoja.ColumnsUsed().AdjustToContents();
    const stream = new MemoryStream();
    libro.SaveAs(stream);
    return File(stream.ToArray(), "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", "Reporte Competencia.xlsx");
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
    urlPagina = `${urlPagina}/Dificultad/VistaPDFListaResultados?competencia=${competencia}`;
    const pdf = new DinkToPdf({
      path: `.${this.apiUrl}VistaPDFListaResultados?competencia=${competencia}`,
      document: document.getElementById('viewBox'),
      width: 800,
      height: 600
    });
    pdf.render();
    return File(pdf.render(), 'application/pdf');
  }

  public IActionResult VistaPDFListaResultadosClas(int competencia) {
    const viewBox = document.getElementById('viewBox');
    const canvas = document.getElementById('canvas');
    html2canvas(viewBox, {
      onrendered: (canvas) => {
        const pdf = new DinkToPdf({
          path: `.${this.apiUrl}VistaPDFListaResultadosClas?competencia=${competencia}`,
          document: canvas,
          width: 800,
          height: 600
        });
        pdf.render();
      }
    });
    return View();
  }

  public IActionResult MostrarPDFNuevaPaginaClas(int competencia) {
    const paginaActual = document.location.pathname;
    const urlPagina = document.location.search;
    urlPagina = urlPagina.replace(paginaActual, '');
    urlPagina = `${urlPagina}/Dificultad/VistaPDFListaResultadosClas?competencia=${competencia}`;
    const pdf = new DinkToPdf({
      path: `.${this.apiUrl}VistaPDFListaResultadosClas?competencia=${competencia}`,
      document: document.getElementById('viewBox'),
      width: 800,
      height: 600
    });
    pdf.render();
    return File(pdf.render(), 'application/pdf');
  }
}

export default DificultadController;