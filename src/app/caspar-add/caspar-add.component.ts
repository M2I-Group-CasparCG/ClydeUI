import { Component, OnInit } from '@angular/core';
import { ApiCallService } from '../api-call.service';


class CasparForm {
  name: string;
  ipAddr: string;
  amcpPort: string;
  errorMessage: string;
}

class CasparSettings {
  name: string;
  ipAddr: string;
  amcpPort: number;
}

@Component({
  selector: 'clydeui-caspar-add',
  templateUrl: './caspar-add.component.html',
  styleUrls: ['./caspar-add.component.less']
})
export class CasparAddComponent implements OnInit {

  casparForm = new CasparForm();


  constructor( private _apiCallService: ApiCallService ) { }

  ngOnInit() {

  }

  casparAdd() {

    const settings = new CasparSettings();
    this.casparForm.errorMessage = '';

    settings.name = this.casparForm.name;

    const ipRegex = /\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}/;
    if (this.casparForm.ipAddr.match(ipRegex)) {
      settings.ipAddr = this.casparForm.ipAddr;
    } else {
      this.casparForm.errorMessage = 'unvalid IP address';
    }

    const amcpPortRegex = /\d{1,5}/;
    if ( this.casparForm.amcpPort.match(amcpPortRegex)) {
      const amcpPort = parseInt(this.casparForm.amcpPort, 10);
      if (amcpPort > 0 && amcpPort <= 65535) {
        settings.amcpPort = amcpPort;
      } else {
        this.casparForm.errorMessage = 'Port number out of range';
      }
    } else {
      this.casparForm.errorMessage = 'AMCP Port must be a valid number';
    }

    if (this.casparForm.errorMessage === '') {
      this._apiCallService.casparAdd(settings)
        .subscribe(
          data => {
            switch (data['object']) {
              case 'Caspar' : {
                console.log('succes');
              } break;
              case 'message' : {
                console.log(data['code']);
                console.log(data['type']);
                console.log(data['description']);
              } break;
              default : {
                console.log('unkown response');
              }
            }
          },
          err => console.log(err),
          () => console.log('')
        );
    }
  }
}
