import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CasparsListComponent } from '../caspars-list/caspars-list.component';
import { SocketIoService } from '../socket-io.service';
import { ApiCallService } from '../api-call.service';
import { Injectable } from '@angular/core';

@Component({
  selector: 'clydeui-caspar-select',
  templateUrl: './caspar-select.component.html',
  styleUrls: ['./caspar-select.component.less']
})



export class CasparSelectComponent extends CasparsListComponent implements OnInit {

  public selectedCasparId: Number;
  @Output() selectedCasparIdChange: EventEmitter<any> = new EventEmitter();

  constructor( _apiCallService: ApiCallService,   _socketIo: SocketIoService) {
    super(_apiCallService, _socketIo);
  }

  ngOnInit() {
    super.ngOnInit();
  }

  casparSelect(event) {
    this.selectedCasparId = event.target.value;
    this.selectedCasparIdChange.emit(event.target.value);
  }

}
