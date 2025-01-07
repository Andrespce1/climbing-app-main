import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { notification } from 'react-notifyify';
import APIConsumer from './APIConsumer';
import _ from 'lodash';
import DinkToPdf from 'dink-to-pdf';
import 'html2canvas';

class PuntajeBloquesController {
  constructor() {
    this.apiUrl = this._getUrlBase();
    this.ViewBag.IdCom = new SelectList(this._context.Competencia, "IdCom", "IdCom");
    this.ViewBag.IdDep = new SelectList(this._context.Deportista, "IdDep", "IdDep");
  }

  async Index() {
    const climbingAppContext = await this._context.PuntajeBloques.Include(p => p.IdComNavigation).Include(p => p.IdDepNavigation).ToListAsync();
    return View(climbingAppContext);
  }

  async Details(int? id) {
    if (id == null || this._context.PuntajeBloques == null) {
      return NotFound();
    }

    const puntajeBloque = await this._context.PuntajeBloques
      .Include(p => p.IdComNavigation)
      .Include(p => p.IdDepNavigation)
      .FirstOrDefaultAsync(m => m.IdBloPts == id);
    if (puntajeBloque == null) {
      return NotFound();
    }

    return View(puntajeBloque);
  }

  Create() {
    this.ViewBag.IdCom = new SelectList(this._context.Competencia, "IdCom", "IdCom");
    this.ViewBag.IdDep = new SelectList(this._context.Deportista, "IdDep", "IdDep");
    return View();
  }

  async Edit(int? id) {
    if (id == null || this._context.PuntajeBloques == null) {
      return NotFound();
    }

    const puntajeBloque = await this._context.PuntajeBloques.FindAsync(id);
    if (puntajeBloque == null) {
      return NotFound();
    }

    this.ViewBag.IdCom = new SelectList(this._context.Competencia, "IdCom", "IdCom", puntajeBloque.IdCom);
    this.ViewBag.IdDep = new SelectList(this._context.Deportista, "IdDep", "IdDep", puntajeBloque.IdDep);
    return View(puntajeBloque);
  }

  async Delete(int? id) {
    if (id == null || this._context.PuntajeBloques == null) {
      return NotFound();
    }

    const puntajeBloque = await this._context.PuntajeBloques
      .Include(p => p.IdComNavigation)
      .Include(p => p.IdDepNavigation)
      .FirstOrDefaultAsync(m => m.IdBloPts == id);
    if (puntajeBloque == null) {
      return NotFound();
    }

    return View(puntajeBloque);
  }

  async DeleteConfirmed(int id) {
    if (this._context.PuntajeBloques == null) {
      return Problem("Entity set 'ProyectoFdiV2Context.PuntajeBloques'  is null.");
    }

    const puntajeBloque = await this._context.PuntajeBloques.FindAsync(id);
    if (puntajeBloque != null) {
      this._context.PuntajeBloques.Remove(puntajeBloque);
    }

    await this._context.SaveChangesAsync();
    return RedirectToAction(nameof(Index));
  }
}

export default PuntajeBloquesController;