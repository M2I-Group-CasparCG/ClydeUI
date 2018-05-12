import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'clydeui-producer-add',
  templateUrl: './producer-add.component.html',
  styleUrls: ['./producer-add.component.less']
})
export class ProducerAddComponent implements OnInit {

  inputSelected = 'FILE';

  @Output() add: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  producerTypeSelect(event) {
    const type = event.target.value;
    this.inputSelected = type;
  }

  formCompleted (form) {
    console.log('form completed');
    this.add.emit(form);
  }
}
