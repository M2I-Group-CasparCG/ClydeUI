import { Component, OnInit, Output, EventEmitter } from '@angular/core';

class ConsumerStreamForm {
  type: string;
  name: string;
  channelId: Number;
  url: string;
  errorMessage: string;
  settings: Object;
}

@Component({
  selector: 'clydeui-stream-consumer-form',
  templateUrl: './stream-consumer-form.component.html',
  styleUrls: ['../consumer-form.component.less']
})
export class StreamConsumerFormComponent implements OnInit {


  @Output() submit: EventEmitter<any> = new EventEmitter();
  consumerStreamForm = new ConsumerStreamForm();

  constructor() { }

  ngOnInit() {
    this.consumerStreamForm.type = 'stream';
  }

  formSubmit() {
    const settings = new Object();
    settings['name'] = this.consumerStreamForm.name;
    settings['channelId'] = this.consumerStreamForm.channelId;
    settings['url'] = this.consumerStreamForm.url;

    this.consumerStreamForm.settings = settings;
    this.submit.emit([this.consumerStreamForm.type, this.consumerStreamForm]);
  }
}
