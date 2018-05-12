import { Component, OnInit, Output, EventEmitter } from '@angular/core';

class ConsumerFileForm {
  type: string;
  name: string;
  channelId: Number;
  path: String;
  errorMessage: string;
  settings: Object;
}

@Component({
  selector: 'clydeui-file-consumer-form',
  templateUrl: './file-consumer-form.component.html',
  styleUrls: ['../consumer-form.component.less']
})
export class FileConsumerFormComponent implements OnInit {

  @Output() submit: EventEmitter<any> = new EventEmitter();
  consumerFileForm = new ConsumerFileForm();

  constructor() { }

  ngOnInit() {
    this.consumerFileForm.type = 'file';
  }

  formSubmit() {
    const settings = new Object();
    settings['name'] = this.consumerFileForm.name;
    settings['channelId'] = this.consumerFileForm.channelId;
    settings['path'] = this.consumerFileForm.path;

    this.consumerFileForm.settings = settings;
    this.submit.emit([this.consumerFileForm.type, this.consumerFileForm]);
  }
}
