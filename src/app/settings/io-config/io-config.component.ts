import { Component, OnInit } from '@angular/core';
import { ApiCallService } from '../../api-call.service';
import { SocketIoService } from '../../socket-io.service';
import { forEach } from '@angular/router/src/utils/collection';
import { CasparSelectComponent } from '../../caspar-select/caspar-select.component';

@Component({
  selector: 'clydeui-io-config',
  templateUrl: './io-config.component.html',
  styleUrls: ['./io-config.component.less']
})

export class IoConfigComponent implements OnInit {

  casparId = null;
  caspars = null;
  caspar = null;
  consumers = null;
  producers = null;
  channels = null;
  medias = null;


  selectedProducerType = 'file';
  producersType = new Map(
    [
      ['file', 'Media'],
      ['ddr', 'Media Player'],
      ['stream', 'Stream'],
      ['decklink', 'Video Card']
    ]
  );

  selectedConsumerType = 'screen';
  consumersType = new Map(
    [
      ['screen', 'Host Screen'],
      ['file', 'Record'],
      ['stream', 'Stream'],
      ['decklink', 'Video Card']
    ]
  );

  constructor(private _apiCallService: ApiCallService, private _socketIoService: SocketIoService) {
  }

  ngOnInit() {
    this.getCaspars();

    this._socketIoService.casparAdd()
      .subscribe((msg: string) => {
        const caspar = JSON.parse(msg);
        this.caspars.set(caspar.id, caspar);
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
      this.producers.delete(producer.id, producer);
    });

  }

  setCasparId(id) {
    this.casparId = id;
    this.getConsumers();
    this.getProducers();
    this.getMedias();
    this.getChannels();
    this.caspar = this.caspars.get(this.casparId);
  }

  getCaspars() {
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
