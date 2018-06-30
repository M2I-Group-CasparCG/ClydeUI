import { Component, OnInit } from '@angular/core';
import { ApiCallService } from '../../api-call.service';
import { SocketIoService } from '../../socket-io.service';

class Settings {
  ipAddr: string;
  port: number;
  url: string;
}



@Component({
  selector: 'clydeui-api-settings',
  templateUrl: './api-settings.component.html',
  styleUrls: ['./api-settings.component.less']
})
export class ApiSettingsComponent implements OnInit {

  apiSettings = new Settings;
  socketIoSettings = new Settings;

  constructor(private _apiCallService: ApiCallService, private _socketIoService: SocketIoService) { }

  ngOnInit() {
    this.apiSettings = this._apiCallService.getApiSettings();
    this.socketIoSettings = this._socketIoService.getSocketIoSettings();
  }

  apiSettingsSubmit() {
    this._apiCallService.setApiSettings(this.apiSettings.ipAddr, this.apiSettings.port);
    this.apiSettings = this._apiCallService.getApiSettings();
  }

  socketIoSettingsSubmit() {
    this._socketIoService.setSocketIoSettings(this.socketIoSettings.ipAddr, this.socketIoSettings.port);
    this.socketIoSettings = this._socketIoService.getSocketIoSettings();
  }

}
