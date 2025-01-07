import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { notification } from 'react-notifyify';
import APIConsumer from './APIConsumer';
import _ from 'lodash';
import DinkToPdf from 'dink-to-pdf';
import 'html2canvas';

class EntrenadorController {
  constructor(configuration) {
    this.apiUrl = configuration["urlBase"].ToString() + "Entrenador/";
    this.ViewBag.SearchFor = "";
  }

  [Authorize(Roles = "Administrador")]
  Index(string? searchFor) {
    if (string.IsNullOrWhiteSpace(searchFor)) {
      return View(APIConsumer<Entrenador>.Select(this.apiUrl));
    } else {
      return View(APIConsumer<Entrenador>.Select_SearchFor(this.apiUrl, searchFor));
    }
  }

  listaProvincias() {
    const provincias = APIConsumer<Provincium>.Select(this.apiUrl.Replace("Entrenador", "Provincia"));
    const lista = provincias.Select(f => new SelectListItem
    {
      Value = f.IdPro.ToString(),
      Text = f.NombrePro
    }).ToList();

    return lista;
  }

  listaDeportistas() {
    const deportistas = APIConsumer<Deportistum>.Select(this.apiUrl.Replace("Entrenador", "Deportista"));
    const lista = deportistas.Select(f => new SelectListItem
    {
      Value = f.IdDep.ToString(),
      Text = f.NombresDep
    }).ToList();

    return lista;
  }

  listaUsuarios() {
    const usuarios = APIConsumer<Usuario>.Select(this.apiUrl.Replace("Entrenador", "Usuario"));
    const lista = usuarios.Select(f => new SelectListItem
    {
      Value = f.IdUsu.ToString(),
      Text = f.NombreUsu
    }).ToList();

    return lista;
  }

  listaEstados() {
    const roles = new List<SelectListItem>();
    roles.Add(new SelectListItem { Text = "Activo", Value = "true" });
    roles.Add(new SelectListItem { Text = "Inactivo", Value = "false" });
    return roles;
  }

  [Authorize(Roles = "Administrador")]
  Details(int id) {
    const data = APIConsumer<Entrenador>.SelectOne(this.apiUrl + id.ToString());
    return View(data);
  }

  Create() {
    const url = this.apiUrl;
    this.ViewBag.ListaDeportistas = this.listaDeportistas();
    this.ViewBag.ListaProvincias = this.listaProvincias();
    this.ViewBag.ListaUsuarios = this.listaUsuarios();
    this.ViewBag.ListaEstados = this.listaEstados();
    return View();
  }

  [Authorize(Roles = "Administrador")]
  [HttpPost]
  Create(Entrenador entrenador) {
    try {
      const usuario = new Usuario();
      usuario.IdUsu = 0;
      usuario.NombreUsu = entrenador.CedulaEnt;
      usuario.ClaveUsu = entrenador.CedulaEnt;
      usuario.FechaCreacion = new Date();
      usuario.RolesUsu = "Entrenador";
      usuario.ActivoUsu = true;

      entrenador.IdUsuNavigation = usuario;

      APIConsumer<Entrenador>.Insert(this.apiUrl, entrenador);
      return RedirectToAction(nameof(Index));
    } catch (Exception ex) {
      ModelState.AddModelError("", ex.Message);
      return View(entrenador);
    }
  }

  [Authorize(Roles = "Administrador")]
  [HttpGet]
  Edit(int id) {
    const url = this.apiUrl;
    this.ViewBag.ListaDeportistas = this.listaDeportistas();
    this.ViewBag.ListaProvincias = this.listaProvincias();
    this.ViewBag.ListaUsuarios = this.listaUsuarios();
    this.ViewBag.ListaEstados = this.listaEstados();
    const data = APIConsumer<Entrenador>.SelectOne(this.apiUrl + id.ToString());
    return View(data);
  }

  [Authorize(Roles = "Administrador")]
  [HttpPost]
  Edit(int id, Entrenador entrenador) {
    try {
      APIConsumer<Entrenador>.Update(this.apiUrl + id.ToString(), entrenador);
      return RedirectToAction(nameof(Index));
    } catch (Exception ex) {
      ModelState.AddModelError("", ex.Message);
      return View(entrenador);
    }
  }

  [Authorize(Roles = "Administrador")]
  [HttpGet]
  Delete(int id) {
    const data = APIConsumer<Entrenador>.SelectOne(this.apiUrl + id.ToString());
    return View(data);
  }

  [Authorize(Roles = "Administrador")]
  [HttpPost]
  Delete(int id, Entrenador entrenador) {
    try {
      const data = APIConsumer<Entrenador>.SelectOne(this.apiUrl + id.ToString());
      const usuario = data.IdUsuNavigation;
      usuario.ActivoUsu = false;
      data.ActivoEnt = false;
      APIConsumer<Entrenador>.Update(this.apiUrl + id.ToString(), data);
      APIConsumer<Usuario>.Update(this.apiUrl.Replace("Entrenador", "Usuario") + usuario.IdUsu.ToString(), usuario);
      return RedirectToAction(nameof(Index));
    } catch {
      return View(entrenador);
    }
  }
}

export default EntrenadorController;