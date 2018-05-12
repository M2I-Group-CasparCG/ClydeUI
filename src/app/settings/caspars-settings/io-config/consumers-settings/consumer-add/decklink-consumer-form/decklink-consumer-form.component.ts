import { Component, OnInit, Output, EventEmitter } from '@angular/core';

class ConsumerDecklinkForm {
  type: string;
  name: string;
  channelId: Number;
  bufferDepth: Number;
  decklinkId: Number;
  latency: Number;
  errorMessage: string;
  settings: Object;
}



@Component({
  selector: 'clydeui-decklink-consumer-form',
  templateUrl: './decklink-consumer-form.component.html',
  styleUrls: ['../consumer-form.component.less']
})
export class DecklinkConsumerFormComponent implements OnInit {

  @Output() submit: EventEmitter<any> = new EventEmitter();
  consumerDecklinkForm = new ConsumerDecklinkForm();

  constructor() { }

  ngOnInit() {
    this.consumerDecklinkForm.type = 'decklink';
  }

  formSubmit() {
    const settings = new Object();
    settings['name'] = this.consumerDecklinkForm.name;
    settings['channelId'] = this.consumerDecklinkForm.channelId;
    settings['decklinkId'] = this.consumerDecklinkForm.decklinkId;
    settings['bufferDepth'] = this.consumerDecklinkForm.bufferDepth;
    settings['latency'] = this.consumerDecklinkForm.latency;

    this.consumerDecklinkForm.settings = settings;
    this.submit.emit([this.consumerDecklinkForm.type, this.consumerDecklinkForm]);
  }

}
