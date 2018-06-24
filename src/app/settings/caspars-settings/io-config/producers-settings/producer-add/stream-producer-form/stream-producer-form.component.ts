import { Component, OnInit, Output, EventEmitter } from '@angular/core';

class ProducerStreamForm {
  type: string;
  name: string;
  url: string;
  errorMessage: string;
  settings: Object;
}

@Component({
  selector: 'clydeui-stream-producer-form',
  templateUrl: './stream-producer-form.component.html',
  styleUrls: ['../producer-form.component.less']
})
export class StreamProducerFormComponent implements OnInit {

  @Output() whenFormCompleted: EventEmitter<any> = new EventEmitter();
  producerStreamForm = new ProducerStreamForm();

  constructor() { }

  ngOnInit() {
    this.producerStreamForm.type = 'stream';
  }

  producerAdd() {
    console.log('producerAdd');
    console.log(this.producerStreamForm.type);
    const settings = new Object();
        settings['name'] = this.producerStreamForm.name;
        settings['url'] = this.producerStreamForm.url;
    this.producerStreamForm.settings = settings;
    this.whenFormCompleted.emit([this.producerStreamForm.type, this.producerStreamForm]);
  }

}
