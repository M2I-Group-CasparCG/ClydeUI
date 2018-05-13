import { Component, OnInit, OnChanges, Input, Output, EventEmitter } from '@angular/core';
import { SocketIoService } from '../../../../../socket-io.service';
import { ApiCallService } from '../../../../../api-call.service';

@Component({
  selector: 'clydeui-producers-list',
  templateUrl: './producers-list.component.html',
  styleUrls: ['./producers-list.component.less']
})
export class ProducersListComponent implements OnInit {


  @Input() producers;

  @Output() delete: EventEmitter<any> = new EventEmitter();
  @Output() edit: EventEmitter<any> = new EventEmitter();
  @Output() start: EventEmitter<any> = new EventEmitter();
  @Output() stop: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit() {

  }

  editSubmit($event) {

  }

  deleteSubmit(producerId) {
    console.log(producerId);
    this.delete.emit(producerId);
  }

  startSubmit(producerId) {
    console.log(producerId);
    this.start.emit(producerId);
  }

  stopSubmit(producerId) {
    console.log(producerId);
    this.stop.emit(producerId);
  }

}
