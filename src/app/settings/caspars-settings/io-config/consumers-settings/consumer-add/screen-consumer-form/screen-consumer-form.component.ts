import { Component, OnInit, Output, EventEmitter } from '@angular/core';

class ConsumerScreenForm {
  type: string;
  name: string;
  channelId: Number;
  errorMessage: string;
  settings: Object;
}

@Component({
  selector: 'clydeui-screen-consumer-form',
  templateUrl: './screen-consumer-form.component.html',
  styleUrls: ['../consumer-form.component.less']
})
export class ScreenConsumerFormComponent implements OnInit {


  @Output() submit: EventEmitter<any> = new EventEmitter();
  consumerScreenForm = new ConsumerScreenForm();

  constructor() { }

  ngOnInit() {
    this.consumerScreenForm.type = 'screen';
  }

  formSubmit() {
    const settings = new Object();
    settings['name'] = this.consumerScreenForm.name;
    settings['channelId'] = this.consumerScreenForm.channelId;

    this.consumerScreenForm.settings = settings;
    this.submit.emit([this.consumerScreenForm.type, this.consumerScreenForm]);
  }
}
