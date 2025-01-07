import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { notification } from 'react-notifyify';
import APIConsumer from './APIConsumer';
import _ from 'lodash';
import DinkToPdf from 'dink-to-pdf';
import 'html2canvas';

class UsuarioController {
  constructor() {
    this.apiUrl = this._getUrlBase();
    this.ViewBag.ListadoRoles = new List<SelectListItem>();
  }

  listaRoles() {
    const roles = new List<SelectListItem>();
    roles.Add(new SelectListItem { Text = "Administrador", Value = "Administrador" });
    roles.Add(new SelectListItem { Text = "Juez", Value = "Juez" });
    roles.Add(new SelectListItem { Text = "Entrenador", Value = "Entrenador" });
    roles.Add(new SelectListItem { Text = "Deportista", Value = "Deportista" });
    return roles;
  }

  listaEstados() {
    const roles = new List<SelectListItem>();
    roles.Add(new SelectListItem { Text = "Activo", Value = "true" });
    roles.Add(new SelectListItem { Text = "Inactivo", Value = "false" });
    return roles;
  }

  [Authorize(Roles = "Administrador")]
  Index() {
    const data = APIConsumer<Usuario>.Select(this.apiUrl);
    return View(data);
  }

  [Authorize(Roles = "Administrador")]
  Details(int id) {
    const data = APIConsumer<Usuario>.SelectOne(this.apiUrl + id.ToString());
    return View(data);
  }

  Create() {
    this.ViewBag.ListadoRoles = this.listaRoles();
    this.ViewBag.ListadoEstados = this.listaEstados();
    return View();
  }

  [Authorize(Roles = "Administrador")]
  [HttpPost]
  Create(Usuario usuario) {
    try {
      APIConsumer<Usuario>.Insert(this.apiUrl, usuario);
      return RedirectToAction(nameof(Index));
    } catch (Exception ex) {
      ModelState.AddModelError("", ex.Message);
      return View(usuario);
    }
  }

  [Authorize(Roles = "Administrador")]
  [HttpGet]
  Edit(int id) {
    this.ViewBag.ListadoRoles = this.listaRoles();
    this.ViewBag.ListadoEstados = this.listaEstados();
    const data = APIConsumer<Usuario>.SelectOne(this.apiUrl + id.ToString());
    return View(data);
  }

  [Authorize(Roles = "Administrador")]
  [HttpPost]
  Edit(int id, Usuario usuario) {
    try {
      APIConsumer<Usuario>.Update(this.apiUrl + id.ToString(), usuario);
      return RedirectToAction(nameof(Index));
    } catch (Exception ex) {
      ModelState.AddModelError("", ex.Message);
      return View(usuario);
    }
  }

  [Authorize(Roles = "Administrador")]
  [HttpGet]
  Delete(int id) {
    const data = APIConsumer<Usuario>.SelectOne(this.apiUrl + id.ToString());
    return View(data);
  }

  [Authorize(Roles = "Administrador")]
  [HttpPost]
  Delete(int id, Usuario usuario) {
    try {
      APIConsumer<Usuario>.Delete(this.apiUrl + id.ToString());
      return RedirectToAction(nameof(Index));
    } catch {
      return View(usuario);
    }
  }
}

export default UsuarioController;