import { Component, OnInit } from '@angular/core';
import { ApiCallService } from '../../../api-call.service';
import { SocketIoService } from '../../../socket-io.service';
import { forEach } from '@angular/router/src/utils/collection';
import { CasparSelectComponent } from '../../../caspar-select/caspar-select.component';


@Component({
  selector: 'clydeui-io-config',
  templateUrl: './io-config.component.html',
  styleUrls: ['./io-config.component.less']
})

export class IoConfigComponent implements OnInit {

  casparId = null;

  constructor() {
  }

  ngOnInit() {
  }

  setCasparId(id) {
    this.casparId = id;
  }

}
