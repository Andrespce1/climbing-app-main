import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { notification } from 'react-notifyify';
import APIConsumer from './APIConsumer';
import _ from 'lodash';
import DinkToPdf from 'dink-to-pdf';
import 'html2canvas';

class SedeController {
  constructor() {
    this.apiUrl = this._getUrlBase();
    this.ViewBag.SearchFor = "";
  }

  [Authorize(Roles = "Administrador,Juez")]
  Index() {
    const data = APIConsumer<Sede>.Select(this.apiUrl);
    return View(data);
  }

  [Authorize(Roles = "Administrador,Juez")]
  Details(int id) {
    const data = APIConsumer<Sede>.SelectOne(this.apiUrl + id.ToString());
    return View(data);
  }

  Create() {
    return View();
  }

  [Authorize(Roles = "Administrador,Juez")]
  [HttpPost]
  Create(Sede sede) {
    try {
      APIConsumer<Sede>.Insert(this.apiUrl, sede);
      return RedirectToAction(nameof(Index));
    } catch (Exception ex) {
      ModelState.AddModelError("", ex.Message);
      return View(sede);
    }
  }

  [Authorize(Roles = "Administrador,Juez")]
  [HttpGet]
  Edit(int id) {
    const data = APIConsumer<Sede>.SelectOne(this.apiUrl + id.ToString());
    return View(data);
  }

  [Authorize(Roles = "Administrador,Juez")]
  [HttpPost]
  Edit(int id, Sede sede) {
    try {
      APIConsumer<Sede>.Update(this.apiUrl + id.ToString(), sede);
      return RedirectToAction(nameof(Index));
    } catch (Exception ex) {
      ModelState.AddModelError("", ex.Message);
      return View(sede);
    }
  }

  [Authorize(Roles = "Administrador,Juez")]
  [HttpGet]
  Delete(int id) {
    const data = APIConsumer<Sede>.SelectOne(this.apiUrl + id.ToString());
    return View(data);
  }

  [Authorize(Roles = "Administrador,Juez")]
  [HttpPost]
  Delete(int id, Sede sede) {
    try {
      APIConsumer<Sede>.Delete(this.apiUrl + id.ToString());
      return RedirectToAction(nameof(Index));
    } catch {
      return View(sede);
    }
  }
}

export default SedeController;