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

  getProducers() {
    return this.http.get(apiUrl + '/caspars/1/producers');
  }

  getChannels() {
    return this.http.get(apiUrl + '/caspars/1/channels');
  }

  channelSwitch(channelId, consumerId) {
    const body = '';
    return this.http.post(apiUrl + '/caspars/1/channels/' + channelId + '/' + consumerId, body, httpOptions);
  }

}
