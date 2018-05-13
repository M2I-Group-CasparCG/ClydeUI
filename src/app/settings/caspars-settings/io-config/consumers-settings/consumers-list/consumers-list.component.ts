import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { SocketIoService } from '../.././../../../socket-io.service';

@Component({
  selector: 'clydeui-consumers-list',
  templateUrl: './consumers-list.component.html',
  styleUrls: ['./consumers-list.component.less']
})
export class ConsumersListComponent implements OnInit {

  @Input() consumers;
  @Output() delete: EventEmitter<any> = new EventEmitter();
  @Output() edit: EventEmitter<any> = new EventEmitter();
  @Output() start: EventEmitter<any> = new EventEmitter();
  @Output() stop: EventEmitter<any> = new EventEmitter();

  public recordInfo = new Map();

  constructor( private _socketIo: SocketIoService) { }

  ngOnInit() {

    this._socketIo.recordInfo()
    .subscribe((msg: string) => {
      let recInfo;
      recInfo = JSON.parse(msg);
      this.recordInfo.set(recInfo.path, recInfo.frame);
    });

  }

  editSubmit($event) {

  }

  deleteSubmit(consumerId) {
    console.log(consumerId);
    this.delete.emit(consumerId);
  }

  startSubmit(consumerId) {
    console.log(consumerId);
    this.start.emit(consumerId);
  }

  stopSubmit(consumerId) {
    console.log(consumerId);
    this.stop.emit(consumerId);
  }

}
