import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { notification } from 'react-notifyify';
import APIConsumer from './APIConsumer';
import _ from 'lodash';
import DinkToPdf from 'dink-to-pdf';
import 'html2canvas';

class JuezController {
  constructor() {
    this.apiUrl = this._getUrlBase();
    this.ViewBag.SearchFor = "";
  }

  [Authorize(Roles = "Administrador")]
  Index(string? searchFor) {
    if (string.IsNullOrWhiteSpace(searchFor)) {
      return View(APIConsumer<Juez>.Select(this.apiUrl));
    } else {
      return View(APIConsumer<Juez>.Select_SearchFor(this.apiUrl, searchFor));
    }
  }

  listaEstados() {
    const roles = new List<SelectListItem>();
    roles.Add(new SelectListItem { Text = "Si", Value = "true" });
    roles.Add(new SelectListItem { Text = "No", Value = "false" });
    return roles;
  }

  listaProvincias() {
    const provincias = APIConsumer<Provincium>.Select(this.apiUrl.Replace("Juez", "Provincia"));
    const lista = provincias.Select(f => new SelectListItem
    {
      Value = f.IdPro.ToString(),
      Text = f.NombrePro
    }).ToList();
    return lista;
  }

  listaUsuarios() {
    const usuarios = APIConsumer<Usuario>.Select(this.apiUrl.Replace("Juez", "Usuario"));
    const lista = usuarios.Select(f => new SelectListItem
    {
      Value = f.IdUsu.ToString(),
      Text = f.NombreUsu
    }).ToList();
    return lista;
  }

  listaEstados2() {
    const roles = new List<SelectListItem>();
    roles.Add(new SelectListItem { Text = "Activo", Value = "true" });
    roles.Add(new SelectListItem { Text = "Inactivo", Value = "false" });
    return roles;
  }

  [Authorize(Roles = "Administrador")]
  Details(int id) {
    this._logger.info('Llamada al método Details');
    const data = APIConsumer<Juez>.SelectOne(this.apiUrl + id.ToString());
    return View(data);
  }

  Create() {
    this.ViewBag.ListaProvincias = this.listaProvincias();
    this.ViewBag.ListaUsuarios = this.listaUsuarios();
    this.ViewBag.ListaEstados = this.listaEstados();
    this.ViewBag.ListaEstados2 = this.listaEstados2();
    return View();
  }

  [Authorize(Roles = "Administrador")]
  [HttpPost]
  Create(Juez juez) {
    try {
      const usuario = new Usuario();
      usuario.IdUsu = 0;
      usuario.NombreUsu = juez.CedulaJuez;
      usuario.ClaveUsu = juez.CedulaJuez;
      usuario.FechaCreacion = new Date();
      usuario.RolesUsu = "Juez";
      usuario.ActivoUsu = true;
      juez.IdUsuNavigation = usuario;
      APIConsumer<Juez>.Insert(this.apiUrl, juez);
      return RedirectToAction(nameof(Index));
    } catch (Exception ex) {
      ModelState.AddModelError("", ex.Message);
      return View(juez);
    }
  }

  [Authorize(Roles = "Administrador")]
  [HttpGet]
  Edit(int id) {
    this.ViewBag.ListaProvincias = this.listaProvincias();
    this.ViewBag.ListaUsuarios = this.listaUsuarios();
    this.ViewBag.ListaEstados = this.listaEstados();
    this.ViewBag.ListaEstados2 = this.listaEstados2();
    const data = APIConsumer<Juez>.SelectOne(this.apiUrl + id.ToString());
    return View(data);
  }

  [Authorize(Roles = "Administrador")]
  [HttpPost]
  Edit(int id, Juez juez) {
    try {
      APIConsumer<Juez>.Update(this.apiUrl + id.ToString(), juez);
      return RedirectToAction(nameof(Index));
    } catch (Exception ex) {
      ModelState.AddModelError("", ex.Message);
      return View(juez);
    }
  }

  [Authorize(Roles = "Administrador")]
  [HttpGet]
  Delete(int id) {
    const data = APIConsumer<Juez>.SelectOne(this.apiUrl + id.ToString());
    return View(data);
  }

  [Authorize(Roles = "Administrador")]
  [HttpPost]
  Delete(int id, Juez juez) {
    try {
      const data = APIConsumer<Juez>.SelectOne(this.apiUrl + id.ToString());
      const usuario = data.IdUsuNavigation;
      usuario.ActivoUsu = false;
      data.ActivoJuez = false;
      APIConsumer<Juez>.Update(this.apiUrl + id.ToString(), data);
      APIConsumer<Usuario>.Update(this.apiUrl.Replace("Juez", "Usuario") + usuario.IdUsu.ToString(), usuario);
      return RedirectToAction(nameof(Index));
    } catch {
      return View(juez);
    }
  }
}

export default JuezController;