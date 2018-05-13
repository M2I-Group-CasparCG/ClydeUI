import { Component, OnInit, Output, EventEmitter } from '@angular/core';

class ConsumerStreamForm {
  type: string;
  name: string;
  channelId: Number;
  protocol: string;
  host: string;
  port: string;
  pictureWidth: Number;
  pictureHeight: Number;
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
    settings['protocol'] = this.consumerStreamForm.protocol;
    settings['host'] = this.consumerStreamForm.host;
    settings['port'] = this.consumerStreamForm.port;
    settings['pictureHeight'] = this.consumerStreamForm.pictureHeight;

    this.consumerStreamForm.settings = settings;
    this.submit.emit([this.consumerStreamForm.type, this.consumerStreamForm]);
  }
}
