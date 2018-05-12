import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'clydeui-consumers-list',
  templateUrl: './consumers-list.component.html',
  styleUrls: ['./consumers-list.component.less']
})
export class ConsumersListComponent implements OnInit {

  @Input() consumers;
  @Output() delete: EventEmitter<any> = new EventEmitter();
  @Output() edit: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  editSubmit($event) {

  }

  deleteSubmit(consumerId) {
    console.log(consumerId);
    this.delete.emit(consumerId);
  }

}
