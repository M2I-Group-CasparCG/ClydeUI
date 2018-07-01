import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ApiCallService } from './../../../../../../api-call.service';

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

  casparId;
  channels;
  @Input('casparId') set _casparId(casparId) {
    this.casparId = casparId;
    this.getChannels();
  }

  @Output() submit: EventEmitter<any> = new EventEmitter();
  consumerStreamForm = new ConsumerStreamForm();

  constructor(private _apiCallService: ApiCallService) { }

  ngOnInit() {
    this.consumerStreamForm.type = 'stream';
  }

  getChannels() {
    this._apiCallService.channelGetAll(this.casparId)
      .subscribe(
        data => {
          this.channels = new Map();
          let element = null;
          element = data;
          element.forEach(channel => {
            console.log(JSON.stringify(channel[1]));
            this.channels.set(channel[0], channel[1]);
          });
        }
      );
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
