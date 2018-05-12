import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CasparsSettingsComponent } from '../settings/caspars-settings/caspars-settings.component';
import { SocketIoService } from '../socket-io.service';
import { ApiCallService } from '../api-call.service';
import { Injectable } from '@angular/core';

@Component({
  selector: 'clydeui-caspar-select',
  templateUrl: './caspar-select.component.html',
  styleUrls: ['./caspar-select.component.less']
})



export class CasparSelectComponent extends CasparsSettingsComponent implements OnInit {

  public selectedCasparId;
  @Output() select: EventEmitter<any> = new EventEmitter();


  constructor( _apiCallService: ApiCallService, _socketIo: SocketIoService) {
    super(_apiCallService, _socketIo);
  }

  ngOnInit() {
    super.ngOnInit();
  }

  selectSubmit(event) {
    this.selectedCasparId = event.target.value;
    this.select.emit(this.selectedCasparId);
  }

}
