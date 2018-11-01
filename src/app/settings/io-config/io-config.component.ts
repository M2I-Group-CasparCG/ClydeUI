import { Component } from '@angular/core';
import { ApiCallService } from '../../api-call.service';
import { CasparDataService } from '../../caspar-data.service';

@Component({
  selector: 'clydeui-io-config',
  templateUrl: './io-config.component.html',
  styleUrls: ['./io-config.component.less']
})

export class IoConfigComponent {

  casparId = null;
  caspar;
  // consumers = new Map();
  // producers = new Map();
  // channels = new Map();
  medias = new Map();
  cards = new Map();

  selectedProducerType = 'file';
  producersType = new Map();

  selectedConsumerType = 'screen';
  consumersType = new Map();

  constructor(
    private _apiCallService: ApiCallService,
    public casparData: CasparDataService) {
  }

  async setCasparId(id) {

    this.consumersType = new Map(
      [
        ['screen', 'Host Screen'],
        ['file', 'Record'],
        ['stream', 'Stream'],
        ['decklink', 'Video Card']
      ]
    );
    this.producersType = new Map(
      [
        ['file', 'Media'],
        ['ddr', 'Media Player'],
        ['stream', 'Stream'],
        ['decklink', 'Video Card']
      ]
    );

    console.log('ID !!!!!!');

    // this.cards = new Map();
    this.casparId = parseInt(id, 10);
    this.caspar = null;
    this.caspar = this.casparData.caspars.get(this.casparId);
    console.log('___________________');
    console.log(this.caspar.casparCommon.decklinkCards.length);
    for (let n = 0; n < this.caspar.casparCommon.decklinkCards.length; n++) {
      this.cards.set(this.caspar.casparCommon.decklinkCards[n][0], this.caspar.casparCommon.decklinkCards[n][1]);
      console.log('card');
    }
    console.log('/___________________');
  }

  getMedias() {
    this._apiCallService.casparGetMedias(this.casparId)
    .subscribe(
       data => {
         this.medias = new Map();
         let element = null;
            element = data;
            element.forEach(media => {
              this.medias.set(media[0], media[1]);
            });
       }
    );
  }


  editChannel (channelId, settings) {
      console.log(JSON.stringify(settings));
      this._apiCallService.channelEdit(this.casparId, channelId, settings)
        .subscribe(
          data => function() {
            console.log(JSON.stringify(data));
          }
        );
  }

  consumerFormSubmit(form) {
    form.channelId = parseInt(form.channelId, 10);

    console.log(form);
    console.log(JSON.stringify(form));
    this._apiCallService.consumerAdd(this.casparId, this.selectedConsumerType, form)
      .subscribe(
        data => function() {
          console.log(JSON.stringify(data));
        }
      );
  }

  producerFormSubmit(form) {
    console.log(JSON.stringify(form));
    this._apiCallService.producerAdd(this.casparId, this.selectedProducerType, form)
      .subscribe(
        data => function() {
          console.log(JSON.stringify(data));
        }
      );
  }


  start(elementType, elementId) {
    switch (elementType) {
      case 'Producer' : {
        console.log('producerDelete');
        this._apiCallService.producerStart(this.casparId, elementId)
          .subscribe(
            data => function() {
              console.log(JSON.stringify(data));
            }
          );
      } break;
      case 'Consumer' : {
        this._apiCallService.consumerStart(this.casparId, elementId)
          .subscribe(
            data => function() {
              console.log(JSON.stringify(data));
            }
          );
      } break;
    }
  }

  stop(elementType, elementId) {
    switch (elementType) {
      case 'Producer' : {
        console.log('producerDelete');
        this._apiCallService.producerStop(this.casparId, elementId)
          .subscribe(
            data => function() {
              console.log(JSON.stringify(data));
            }
          );
      } break;
      case 'Consumer' : {
        this._apiCallService.consumerStop(this.casparId, elementId)
          .subscribe(
            data => function() {
              console.log(JSON.stringify(data));
            }
          );
      } break;
    }
  }

  delete(elementType, elementId) {
    switch (elementType) {
      case 'Producer' : {
        console.log('producerDelete');
        this._apiCallService.producerDelete(this.casparId, elementId)
          .subscribe(
            data => function() {
              console.log(JSON.stringify(data));
            }
          );
      } break;
      case 'Consumer' : {
        this._apiCallService.consumerDelete(this.casparId, elementId)
          .subscribe(
            data => function() {
              console.log(JSON.stringify(data));
            }
          );
      } break;
    }
  }

}
