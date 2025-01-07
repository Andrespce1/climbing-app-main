import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { notification } from 'react-notifyify';
import APIConsumer from './APIConsumer';
import _ from 'lodash';
import DinkToPdf from 'dink-to-pdf';
import 'html2canvas';

class BaseController {
  constructor() {
    this._baseUrl = '';
    this._apiUrl = '';
  }

  _getUrlBase() {
    return this._baseUrl;
  }

  _getUrlApi() {
    return this._apiUrl;
  }

  BasicNotification(msj, type, title = "") {
    const tempData = document.getElementById('tempData');
    const notification = document.getElementById('notification');
    const notificationTemplate = document.getElementById('notificationTemplate');
    notificationTemplate.innerHTML = `
      <div class="swal-text">
        ${title}
      </div>
      <div class="swal-content">
        ${msj}
      </div>
    `;
    notification.innerHTML = this._baseUrl + 'Notification Template';
    notification.classList.add(type.toLowerCase());
    notificationTemplate.classList.add(type.toLowerCase());
    notificationTemplate.classList.add('swal-show');
    setTimeout(() => {
      notification.classList.remove('swal-show');
      notificationTemplate.classList.remove('swal-show');
    }, 5000);
  }
}

export default BaseController;