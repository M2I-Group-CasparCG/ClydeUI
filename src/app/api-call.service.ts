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
  producerAdd (casparId, producerType, settings) {
    const body = settings;
    const url = `${apiUrl}/caspars/${casparId}/producers/${producerType}`;
    return this.http.post(url, body, httpOptions);
  }
  producerGet(casparId, producerId) {
    const url = `${apiUrl}/caspars/${casparId}/producers/${producerId}`;
    return this.http.get(url);
  }
  producerGetAll(casparId) {
    const url = `${apiUrl}/caspars/${casparId}/producers`;
    return this.http.get(url);
  }
  producerStart(casparId, producerId) {
    const body = '';
    const url = `${apiUrl}/caspars/${casparId}/producers/${producerId}/start`;
    return this.http.post(url, body, httpOptions);
  }
  producerStop(casparId, producerId) {
    const body = '';
    const url = `${apiUrl}/caspars/${casparId}/producers/${producerId}/stop`;
    return this.http.post(url, body, httpOptions);
  }
  producerEdit(casparId, producerId, settings) {
    const body = settings;
    const url = `${apiUrl}/caspars/${casparId}/producers/${producerId}`;
    return this.http.put(url, body, httpOptions);
  }
  producerDelete(casparId, producerId) {
    const url = `${apiUrl}/caspars/${casparId}/producers/${producerId}`;
    return this.http.delete(url, httpOptions);
  }

  /**
   * Consumers
   */

  consumerAdd (casparId, consumerType, settings) {
    const body = settings;
    const url = `${apiUrl}/caspars/${casparId}/consumers/${consumerType}`;
    return this.http.post(url, body, httpOptions);
  }
  consumerGet(casparId, consumerId) {
    const url = `${apiUrl}/caspars/${casparId}/consumers/${consumerId}`;
    return this.http.get(url);
  }
  consumerGetAll(casparId) {
    const url = `${apiUrl}/caspars/${casparId}/consumers`;
    return this.http.get(url);
  }
  consumerStart(casparId, consumerId) {
    const body = '';
    const url = `${apiUrl}/caspars/${casparId}/consumers/${consumerId}/start`;
    return this.http.post(url, body, httpOptions);
  }
  consumerStop(casparId, consumerId) {
    const body = '';
    const url = `${apiUrl}/caspars/${casparId}/consumers/${consumerId}/stop`;
    return this.http.post(url, body, httpOptions);
  }
  consumerEdit(casparId, consumerId, settings) {
    const body = settings;
    const url = `${apiUrl}/caspars/${casparId}/consumers/${consumerId}`;
    return this.http.put(url, body, httpOptions);
  }
  consumerDelete(casparId, consumerId) {
    const url = `${apiUrl}/caspars/${casparId}/consumers/${consumerId}`;
    return this.http.delete(url, httpOptions);
  }

  /**
   * Channel
   */

  channelAdd (casparId, settings) {

  }
  channelGet(casparId, channelId) {
    const url = `${apiUrl}/caspars/${casparId}/channels/${channelId}`;
    return this.http.get(url);
  }
  channelGetAll(casparId) {
    const url = `${apiUrl}/caspars/${casparId}/channels`;
    return this.http.get(url);
  }
  channelSetInput(casparId, channelId, producerId) {
    const body = '';
    const url = `${apiUrl}/caspars/${casparId}/channels/${channelId}/producers/${producerId}`;
    return this.http.post(url, body, httpOptions);
  }
  channelEdit(casparId, channelId, settings) {
    const body = settings;
    const url = `${apiUrl}/caspars/${casparId}/channels/${channelId}`;
    return this.http.put(url, body, httpOptions);
  }
  channelDelete(casparId, channelId) {
    const url = `${apiUrl}/caspars/${casparId}/channels/${channelId}`;
    return this.http.delete(url, httpOptions);
  }

  /**
   * Layer
   */

  layerAdd (casparId, settings) {
    console.log('coucou');
    console.log(JSON.stringify(settings));
    const body = settings;
    const url = `${apiUrl}/caspars/${casparId}/layers/`;
    return this.http.post(url, body, httpOptions);
  }

  layerGet(casparId, layerId) {
    const url = `${apiUrl}/caspars/${casparId}/layers/${layerId}`;
    return this.http.get(url);
  }
  layerGetAll(casparId, channelId = false) {
    let url = '';
    if (channelId) {
      url = `${apiUrl}/caspars/${casparId}/channel/${channelId}layers`;
    }
    url = `${apiUrl}/caspars/${casparId}/layers`;
    return this.http.get(url);
  }
  layerStart(casparId, layerId) {
    const body = '';
    const url = `${apiUrl}/caspars/${casparId}/layers/${layerId}/start`;
    return this.http.post(url, body, httpOptions);
  }
  layerStop(casparId, layerId) {
    const body = '';
    const url = `${apiUrl}/caspars/${casparId}/layers/${layerId}/stop`;
    return this.http.post(url, body, httpOptions);
  }
  layerSetInput(casparId, layerId, producerId) {
    const body = '';
    const url = `${apiUrl}/caspars/${casparId}/layers/${layerId}/producers/${producerId}`;
    return this.http.post(url, body, httpOptions);
  }
  layerEdit(casparId, layerId, settings) {
    const body = settings;
    const url = `${apiUrl}/caspars/${casparId}/layers/${layerId}`;
    return this.http.put(url, body, httpOptions);
  }
  layerDelete(casparId, layerId) {
    const url = `${apiUrl}/caspars/${casparId}/layers/${layerId}`;
    return this.http.delete(url, httpOptions);
  }




}
