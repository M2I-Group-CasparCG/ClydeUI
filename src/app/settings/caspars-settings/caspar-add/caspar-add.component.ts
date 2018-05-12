import { Component, OnInit, Output, EventEmitter } from '@angular/core';

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

  @Output() add: EventEmitter<any> = new EventEmitter();

  casparForm = new CasparForm();

  constructor() { }

  ngOnInit()  {
  }

  formSubmit() {

    const settings = new CasparSettings();

    // Form validation

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

    // if from is valid
    if (this.casparForm.errorMessage === '') {
      this.add.emit(settings);
    }
  }
}
