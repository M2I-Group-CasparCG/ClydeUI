import { Component, OnInit, AfterContentInit, AfterViewInit } from '@angular/core';
import { ApiCallService } from '../../api-call.service';
import { SocketIoService } from '../../socket-io.service';

@Component({
  selector: 'clydeui-io-config',
  templateUrl: './io-config.component.html',
  styleUrls: ['./io-config.component.less']
})

export class IoConfigComponent implements OnInit, AfterContentInit, AfterViewInit {

  casparId = null;
  caspars = new Map();
  caspar;
  consumers = new Map();
  producers = new Map();
  channels = new Map();
  medias = new Map();
  cards = new Map();

  selectedProducerType = 'file';
  producersType = new Map();

  selectedConsumerType = 'screen';
  consumersType = new Map();

  constructor(private _apiCallService: ApiCallService, private _socketIoService: SocketIoService) {
  }

  ngOnInit() {

    this._socketIoService.casparAdd()
      .subscribe((msg: string) => {
        const caspar = JSON.parse(msg);
        this.caspars.set(caspar.id, caspar);
      });
      this._socketIoService.casparEdit()
      .subscribe((msg: string) => {
        const caspar = JSON.parse(msg);
        this.caspars.set(caspar.id, caspar);
      });

      this._socketIoService.casparDelete()
      .subscribe((msg: string) => {
        const caspar = JSON.parse(msg);
        this.caspars.delete(caspar.id);
      });

    /**
     * Consumers events
     */
    this._socketIoService.consumerAdd()
      .subscribe((msg: string) => {
        const consumer = JSON.parse(msg);
        this.consumers.set(consumer.id, consumer);
    });
    this._socketIoService.consumerEdit()
    .subscribe((msg: string) => {
      const consumer = JSON.parse(msg);
      this.consumers.set(consumer.id, consumer);
    });
    this._socketIoService.consumerDelete()
    .subscribe((msg: string) => {
      const consumer = JSON.parse(msg);
      this.consumers.delete(consumer.id);
    });

    /**
     * Producers events
     */
    this._socketIoService.producerAdd()
      .subscribe((msg: string) => {
        const producer = JSON.parse(msg);
        this.producers.set(producer.id, producer);
    });
    this._socketIoService.producerEdit()
    .subscribe((msg: string) => {
      const producer = JSON.parse(msg);
      this.producers.set(producer.id, producer);
    });
    this._socketIoService.producerDelete()
    .subscribe((msg: string) => {
      const producer = JSON.parse(msg);
      this.producers.delete(producer.id);
    });

     /**
     * Consumers events
     */
    this._socketIoService.channelAdd()
      .subscribe((msg: string) => {
        const channel = JSON.parse(msg);
        this.channels.set(channel.id, channel);
    });
    this._socketIoService.channelEdit()
    .subscribe((msg: string) => {
      const channel = JSON.parse(msg);
      this.channels.set(channel.id, channel);
    });
    this._socketIoService.channelDelete()
    .subscribe((msg: string) => {
      const channel = JSON.parse(msg);
      this.channels.delete(channel.id);
    });


    this.getCaspars();

  }

  ngAfterViewInit() {

  }

  ngAfterContentInit() {

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
    this.getConsumers();
    this.getProducers();
    this.getMedias();
    this.getChannels();
    this.caspar = null;
    this.caspar = this.caspars.get(this.casparId);
    console.log('___________________');
    console.log(JSON.stringify(this.caspars));
    console.log(this.caspar.casparCommon.decklinkCards.length);
    for (let n = 0; n < this.caspar.casparCommon.decklinkCards.length; n++) {
      this.cards.set(this.caspar.casparCommon.decklinkCards[n][0], this.caspar.casparCommon.decklinkCards[n][1]);
      console.log('card');
    }
    console.log('/___________________');
  }

  async getCaspars() {
    this._apiCallService.casparGetAll()
    .subscribe(
       data => {
        this.caspars = new Map();
        let element = null;
            element = data;
            element.forEach(caspar => {
            this.caspars.set(caspar[0], caspar[1]);
          });
       }
    );
  }

  getConsumers() {
    this._apiCallService.consumerGetAll(this.casparId)
    .subscribe(
       data => {
        this.consumers = new Map();
        let element = null;
           element = data;
           element.forEach(consumer => {
             this.consumers.set(consumer[0], consumer[1]);
           });
       }
    );
  }

  getProducers() {
    this._apiCallService.producerGetAll(this.casparId)
    .subscribe(
       data => {
         this.producers = new Map();
         let element = null;
            element = data;
            element.forEach(producer => {
              this.producers.set(producer[0], producer[1]);
            });
       }
    );
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

  getChannels() {
    this._apiCallService.channelGetAll(this.casparId)
    .subscribe(
       data => {
         this.channels = new Map();
         let element = null;
            element = data;
            element.forEach(channel => {
              this.channels.set(channel[0], channel[1]);
            });
       }
    );
  }
  editChannel (channelId, settings){
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
