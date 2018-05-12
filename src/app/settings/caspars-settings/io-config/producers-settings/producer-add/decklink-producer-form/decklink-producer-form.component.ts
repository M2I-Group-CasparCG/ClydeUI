import { Component, OnInit, Output, EventEmitter } from '@angular/core';

class ProducerDecklinkForm {
  type: string;
  name: string;
  decklinkId: number;
  latency: number;
  bufferDepth: number;
  errorMessage: string;
  settings: Object;
}

@Component({
  selector: 'clydeui-decklink-producer-form',
  templateUrl: './decklink-producer-form.component.html',
  styleUrls: ['../producer-form.component.less']
})
export class DecklinkProducerFormComponent implements OnInit {

  @Output() whenFormCompleted: EventEmitter<any> = new EventEmitter();
  producerDecklinkForm = new ProducerDecklinkForm();

  constructor() { }

  ngOnInit() {
    this.producerDecklinkForm.type = 'decklink';
  }

  producerAdd(type) {
    console.log('producerAdd');
    console.log(this.producerDecklinkForm.type);
    const settings = new Object();
        settings['name'] = this.producerDecklinkForm.name;
        settings['decklinkId'] = this.producerDecklinkForm.decklinkId;
        settings['latency'] = this.producerDecklinkForm.latency;
        settings['bufferDepth'] = this.producerDecklinkForm.bufferDepth;
    this.producerDecklinkForm.settings = settings;
    this.whenFormCompleted.emit([this.producerDecklinkForm.type, this.producerDecklinkForm]);
  }

}
