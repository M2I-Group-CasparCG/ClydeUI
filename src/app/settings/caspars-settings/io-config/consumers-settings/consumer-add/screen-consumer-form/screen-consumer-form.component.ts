import { Component, OnInit,  Input, Output, EventEmitter } from '@angular/core';
import { ApiCallService } from './../../../../../../api-call.service';

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

  casparId;
  channels;
  @Input('casparId') set _casparId(casparId) {
    this.casparId = casparId;
    this.getChannels();
  }

  @Output() submit: EventEmitter<any> = new EventEmitter();
  consumerScreenForm = new ConsumerScreenForm();

  constructor(private _apiCallService: ApiCallService) { }

  ngOnInit() {
    this.consumerScreenForm.type = 'screen';
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
    settings['name'] = this.consumerScreenForm.name;
    settings['channelId'] = this.consumerScreenForm.channelId;

    this.consumerScreenForm.settings = settings;
    this.submit.emit([this.consumerScreenForm.type, this.consumerScreenForm]);
  }
}
