import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { SocketIoService } from '../../../socket-io.service';
import { ApiCallService } from '../../../api-call.service';


@Component({
  selector: 'clydeui-caspars-list',
  templateUrl: './caspars-list.component.html',
  styleUrls: ['./caspars-list.component.less']
})
export class CasparsListComponent implements OnInit {

  @Input() caspars;
  @Output() edit: EventEmitter<any> = new EventEmitter();
  @Output() delete: EventEmitter<any> = new EventEmitter();

  constructor( private _apiCallService: ApiCallService, private _socketIo: SocketIoService ) { }

  ngOnInit() {

  }

  editSubmit($event) {
    console.log('editSubmit not implemented yet');
  }

  deleteSubmit(casparId) {
    this.delete.emit(casparId);
  }



}
