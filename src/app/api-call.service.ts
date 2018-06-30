import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

// paramètres des requêtes POST http
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

class ApiSettings {
  ipAddr: string;
  port: number;
  url: string;
}

@Injectable()
export class ApiCallService {

  constructor( private http: HttpClient ) {
    this.apiSettings.ipAddr = '127.0.0.1';
    this.apiSettings.port = 3000;
    this.apiSettings.url = `http://${this.apiSettings.ipAddr}:${this.apiSettings.port}/api/v1`;
    console.log('______________________');
    console.log(this.apiSettings.ipAddr);

  }

  apiSettings = new ApiSettings();



  setApiSettings(ipAddr, port) {

    this.apiSettings.ipAddr = ipAddr;
    this.apiSettings.port = port;
    this.apiSettings.url = `http://${this.apiSettings.ipAddr}:${this.apiSettings.port}/api/v1`;
    console.log(this.apiSettings.url);
    return this.apiSettings;
  }

  getApiSettings() {
    return this.apiSettings;
  }

  /**
   * Caspar
   */
  casparAdd (settings) {
    const body = settings;
    console.log('casparAdd');
    console.log(this.apiSettings.url);
    const url = `${this.apiSettings.url}/caspars/`;
    console.log('____________________');
    console.log(url);
    return this.http.post(url, body, httpOptions);
  }

  casparRestart (casparId) {
    const body = '';
    const url = `${ this.apiSettings.url}/caspars/${casparId}/restart`;
    return this.http.post(url, body, httpOptions);
  }

  casparIni (casparId) {
    const body = '';
    const url = `${ this.apiSettings.url}/caspars/${casparId}/ini`;
    return this.http.post(url, body, httpOptions);
  }

  casparGet (casparId) {
    const url = `${ this.apiSettings.url}/caspars/${casparId}`;
    return this.http.get(url);
  }

  casparGetAll () {
    const url = `${ this.apiSettings.url}/caspars`;
    return this.http.get(url);
  }

  casparEdit (casparId) {
    const body = '';
    const url = `${ this.apiSettings.url}/caspars/${casparId}`;
    return this.http.put(url, body, httpOptions);
  }

  casparDelete (casparId) {
    const body = '';
    const url = `${ this.apiSettings.url}/caspars/${casparId}`;
    return this.http.delete(url);
  }

  casparGetMedias (casparId) {
    const url = `${ this.apiSettings.url}/caspars/${casparId}/medias/`;
    return this.http.get(url);
  }
  /**
   * Producers
   */
  producerAdd (casparId, producerType, settings) {
    const body = settings;
    const url = `${ this.apiSettings.url}/caspars/${casparId}/producers/${producerType}`;
    return this.http.post(url, body, httpOptions);
  }
  producerGet(casparId, producerId) {
    const url = `${ this.apiSettings.url}/caspars/${casparId}/producers/${producerId}`;
    return this.http.get(url);
  }
  producerGetAll(casparId) {
    const url = `${ this.apiSettings.url}/caspars/${casparId}/producers`;
    return this.http.get(url);
  }
  producerStart(casparId, producerId) {
    const body = '';
    const url = `${ this.apiSettings.url}/caspars/${casparId}/producers/${producerId}/start`;
    return this.http.post(url, body, httpOptions);
  }
  producerStop(casparId, producerId) {
    const body = '';
    const url = `${ this.apiSettings.url}/caspars/${casparId}/producers/${producerId}/stop`;
    return this.http.post(url, body, httpOptions);
  }
  producerEdit(casparId, producerId, settings) {
    const body = settings;
    const url = `${ this.apiSettings.url}/caspars/${casparId}/producers/${producerId}`;
    return this.http.put(url, body, httpOptions);
  }
  producerDelete(casparId, producerId) {
    const url = `${ this.apiSettings.url}/caspars/${casparId}/producers/${producerId}`;
    return this.http.delete(url, httpOptions);
  }

  /**
   * Consumers
   */

  consumerAdd (casparId, consumerType, settings) {
    const body = settings;
    const url = `${ this.apiSettings.url}/caspars/${casparId}/consumers/${consumerType}`;
    return this.http.post(url, body, httpOptions);
  }
  consumerGet(casparId, consumerId) {
    const url = `${ this.apiSettings.url}/caspars/${casparId}/consumers/${consumerId}`;
    return this.http.get(url);
  }
  consumerGetAll(casparId) {
    const url = `${ this.apiSettings.url}/caspars/${casparId}/consumers`;
    return this.http.get(url);
  }
  consumerStart(casparId, consumerId) {
    const body = '';
    const url = `${ this.apiSettings.url}/caspars/${casparId}/consumers/${consumerId}/start`;
    return this.http.post(url, body, httpOptions);
  }
  consumerStop(casparId, consumerId) {
    const body = '';
    const url = `${ this.apiSettings.url}/caspars/${casparId}/consumers/${consumerId}/stop`;
    return this.http.post(url, body, httpOptions);
  }
  consumerEdit(casparId, consumerId, settings) {
    const body = settings;
    const url = `${ this.apiSettings.url}/caspars/${casparId}/consumers/${consumerId}`;
    return this.http.put(url, body, httpOptions);
  }
  consumerDelete(casparId, consumerId) {
    const url = `${ this.apiSettings.url}/caspars/${casparId}/consumers/${consumerId}`;
    return this.http.delete(url, httpOptions);
  }

  /**
   * Channel
   */

  channelAdd (casparId, settings) {

  }
  channelGet(casparId, channelId) {
    const url = `${ this.apiSettings.url}/caspars/${casparId}/channels/${channelId}`;
    return this.http.get(url);
  }
  channelGetAll(casparId) {
    const url = `${ this.apiSettings.url}/caspars/${casparId}/channels`;
    return this.http.get(url);
  }
  channelSetInput(casparId, channelId, producerId) {
    const body = '';
    const url = `${ this.apiSettings.url}/caspars/${casparId}/channels/${channelId}/producers/${producerId}`;
    return this.http.post(url, body, httpOptions);
  }
  channelEdit(casparId, channelId, settings) {
    const body = settings;
    const url = `${ this.apiSettings.url}/caspars/${casparId}/channels/${channelId}`;
    return this.http.put(url, body, httpOptions);
  }
  channelDelete(casparId, channelId) {
    const url = `${ this.apiSettings.url}/caspars/${casparId}/channels/${channelId}`;
    return this.http.delete(url, httpOptions);
  }

  /**
   * Layer
   */

  layerAdd (casparId, settings) {
    console.log('coucou');
    console.log(JSON.stringify(settings));
    const body = settings;
    const url = `${ this.apiSettings.url}/caspars/${casparId}/layers/`;
    return this.http.post(url, body, httpOptions);
  }

  layerGet(casparId, layerId) {
    const url = `${ this.apiSettings.url}/caspars/${casparId}/layers/${layerId}`;
    return this.http.get(url);
  }
  layerGetAll(casparId, channelId = false) {
    let url = '';
    if (channelId) {
      url = `${ this.apiSettings.url}/caspars/${casparId}/channel/${channelId}layers`;
    }
    url = `${ this.apiSettings.url}/caspars/${casparId}/layers`;
    return this.http.get(url);
  }
  layerStart(casparId, layerId) {
    const body = '';
    const url = `${ this.apiSettings.url}/caspars/${casparId}/layers/${layerId}/start`;
    return this.http.post(url, body, httpOptions);
  }
  layerStop(casparId, layerId) {
    const body = '';
    const url = `${ this.apiSettings.url}/caspars/${casparId}/layers/${layerId}/stop`;
    return this.http.post(url, body, httpOptions);
  }
  layerSetInput(casparId, layerId, producerId) {
    const body = '';
    const url = `${ this.apiSettings.url}/caspars/${casparId}/layers/${layerId}/producers/${producerId}`;
    return this.http.post(url, body, httpOptions);
  }
  layerEdit(casparId, layerId, settings) {
    const body = settings;
    const url = `${ this.apiSettings.url}/caspars/${casparId}/layers/${layerId}`;
    return this.http.put(url, body, httpOptions);
  }
  layerDelete(casparId, layerId) {
    const url = `${ this.apiSettings.url}/caspars/${casparId}/layers/${layerId}`;
    return this.http.delete(url, httpOptions);
  }

  /**
  * DDR
  */
  mediaPlayerGetPlaylist(casparId, mediaPlayerId) {
    const url = `${ this.apiSettings.url}/caspars/${casparId}/ddr/${mediaPlayerId}/playlist`;
    return this.http.get(url, httpOptions);
  }
  mediaPlayerPlay(casparId, mediaPlayerId) {
    const body = '';
    const url = `${ this.apiSettings.url}/caspars/${casparId}/ddr/${mediaPlayerId}/play`;
    return this.http.post(url, body, httpOptions);
  }
  mediaPlayerPlayId(casparId, mediaPlayerId, index) {
    const body = '';
    const url = `${ this.apiSettings.url}/caspars/${casparId}/ddr/${mediaPlayerId}/playId/${index}`;
    return this.http.post(url, body, httpOptions);
  }
  mediaPlayerSeek(casparId, mediaPlayerId, frame) {
    const body = '';
    const url = `${ this.apiSettings.url}/caspars/${casparId}/ddr/${mediaPlayerId}/seek/${frame}`;
    return this.http.post(url, body, httpOptions);
  }
  mediaPlayerPause(casparId, mediaPlayerId) {
    const body = '';
    const url = `${ this.apiSettings.url}/caspars/${casparId}/ddr/${mediaPlayerId}/pause`;
    return this.http.post(url, body, httpOptions);
  }
  mediaPlayerNext(casparId, mediaPlayerId) {
    const body = '';
    const url = `${ this.apiSettings.url}/caspars/${casparId}/ddr/${mediaPlayerId}/next`;
    return this.http.post(url, body, httpOptions);
  }
  mediaPlayerPrevious(casparId, mediaPlayerId) {
    const body = '';
    const url = `${ this.apiSettings.url}/caspars/${casparId}/ddr/${mediaPlayerId}/previous`;
    return this.http.post(url, body, httpOptions);
  }
  mediaPlayerPlaylistLoop(casparId, mediaPlayerId) {
    const body = '';
    const url = `${ this.apiSettings.url}/caspars/${casparId}/ddr/${mediaPlayerId}/playlistLoop`;
    return this.http.post(url, body, httpOptions);
  }
  mediaPlayerAutoPlay(casparId, mediaPlayerId) {
    const body = '';
    const url = `${ this.apiSettings.url}/caspars/${casparId}/ddr/${mediaPlayerId}/autoPlay`;
    return this.http.post(url, body, httpOptions);
  }

  /**
   * PLAYLIST
   */
  playlistAddMedia(casparId, playlistId, mediaId) {
    const body = '';
    const url = `${ this.apiSettings.url}/caspars/${casparId}/playlists/${playlistId}/files/${mediaId}`;
    return this.http.post(url, body, httpOptions);
  }
  playlistRemoveMedia(casparId, playlistId, mediaIndex) {
    const url = `${ this.apiSettings.url}/caspars/${casparId}/playlists/${playlistId}/index/${mediaIndex}`;
    return this.http.delete(url, httpOptions);
  }


}
