import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'clydeui-consumer-add',
  templateUrl: './consumer-add.component.html',
  styleUrls: ['./consumer-add.component.less']
})
export class ConsumerAddComponent implements OnInit {

  consumerType = 'SCREEN';
  @Output() add: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  consumerTypeSelected(event) {

    const type = event.target.value;
    console.log(type);
    this.consumerType = type;
  }

  formCompleted (form) {
    this.add.emit(form);
  }

}
