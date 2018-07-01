import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ApiCallService } from './../../../../../../api-call.service';


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


  casparId;
  caspar;
  decklinks;

  @Input('casparId') set _casparId(casparId) {
    this.casparId = casparId;
    this.getCaspar();
  }

  @Output() whenFormCompleted: EventEmitter<any> = new EventEmitter();
  producerDecklinkForm = new ProducerDecklinkForm();

  constructor(   private _apiCallService: ApiCallService) { }

  ngOnInit() {
    this.producerDecklinkForm.type = 'decklink';
  }

  getCaspar() {

    this._apiCallService.casparGet(this.casparId)
      .subscribe(
        data => {
          this.caspar = data;
          let element = null;
          element = data;
          this.decklinks = element.casparCommon.decklinkCards;
          console.log('==================');
          console.log(JSON.stringify(element.casparCommon.decklinkCards[0]));
        }
      );
  }

  producerAdd() {
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
