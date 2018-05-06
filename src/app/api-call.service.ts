import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

// paramètres des requêtes POST http
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

const apiUrl = 'http://localhost:3000/api/v1';

@Injectable()
export class ApiCallService {

  constructor( private http: HttpClient ) { }

  /**
   * Caspar
   */
  casparAdd (settings) {
    const body = settings;
    const url = `${apiUrl}/caspars/`;
    return this.http.post(url, body, httpOptions);
  }

  casparRestart (casparId) {
    const body = '';
    const url = `${apiUrl}/caspars/${casparId}/restart`;
    return this.http.post(url, body, httpOptions);
  }

  casparIni (casparId) {
    const body = '';
    const url = `${apiUrl}/caspars/${casparId}/ini`;
    return this.http.post(url, body, httpOptions);
  }

  casparGet (casparId) {
    const url = `${apiUrl}/caspars/${casparId}`;
    return this.http.get(url);
  }

  casparGetAll () {
    const url = `${apiUrl}/caspars`;
    return this.http.get(url);
  }

  casparEdit (casparId) {
    const body = '';
    const url = `${apiUrl}/caspars/${casparId}`;
    return this.http.put(url, body, httpOptions);
  }

  casparDelete (casparId) {
    const body = '';
    const url = `${apiUrl}/caspars/${casparId}`;
    return this.http.delete(url);
  }

  /**
   * Producers
   */

  getProducers() {
    return this.http.get(apiUrl + '/caspars/1/producers');
  }

  producerAdd (casparId, producerType, settings) {
    const body = settings;
    const url = `${apiUrl}/caspars/${casparId}/producers/${producerType}`;
    return this.http.post(url, body, httpOptions);
  }

  /**
   * Consumer
   */

  /**
   * Channel
   */

  getChannels() {
    return this.http.get(apiUrl + '/caspars/1/channels');
  }

  channelSwitch(channelId, consumerId) {
    const body = '';
    return this.http.post(apiUrl + '/caspars/1/channels/' + channelId + '/' + consumerId, body, httpOptions);
  }

  /**
   * Layer
   */






}
