import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ApiCallService } from './api-call.service';
import { SocketIoService } from './socket-io.service';
import { mapChildrenIntoArray } from '@angular/router/src/url_tree';

@Injectable()
export class CasparDataService {

  caspars     = new Map();

  constructor(
    private _apiCallService: ApiCallService,
    private _socketIoService: SocketIoService
  ) {

    this.socketIoSubsciption();

    this.apiCallCollect();

  }

  async apiCallCollect () {


    this.caspars     = new Map();

    /**
     * Caspars
     */
    this._apiCallService.casparGetAll().subscribe(data => {
      let element = null;
          element = data;
          element.forEach(caspar => {
            console.log('coucou');
            this.caspars.set(caspar[0], caspar[1]);
            this.subObjectCollect(caspar[0]);

        });
      }
    );

  }

  subObjectCollect(id) {
     /**
           * Consumers
           */
          this._apiCallService.consumerGetAll(id).subscribe(data_ => {
            const consumers = new Map();
            let element_ = null;
                element_ = data_;
                element_.forEach(consumer => {
                  consumers.set(consumer[0], consumer[1]);
                });
            this.caspars.get(id)['consumers'] = consumers;
          });

          /**
           * Producers
           */
          this._apiCallService.producerGetAll(id).subscribe(data_ => {
            const producers = new Map();
            let element_ = null;
                element_ = data_;
                element_.forEach(producer => {
                  producers.set(producer[0], producer[1]);
                });
            this.caspars.get(id)['producers'] = producers;
          });

          /**
           * Channels
           */
          this._apiCallService.channelGetAll(id).subscribe(data_ => {
            const channels = new Map();
            let element_ = null;
                element_ = data_;
                element_.forEach(channel => {
                  channels.set(channel[0], channel[1]);
                });
            this.caspars.get(id)['channels'] = channels;
          });

          /**
           * Layers
           */
          this._apiCallService.layerGetAll(id).subscribe(data_ => {
            const layers = new Map();
            let element_ = null;
                element_ = data_;
                element_.forEach(layer => {
                  layers.set(layer[0], layer[1]);
                });
            this.caspars.get(id)['layers'] = layers;
          });

          /**
           * Medias
           */
          // this._apiCallService.medias(id).subscribe(data_ => {
          //   const medias = new Map();
          //   let element_ = null;
          //       element_ = data_;
          //       element_.forEach(layer => {
          //         this.medias.set(layer[0], layer[1]);
          //   });
          // });
  }


  socketIoSubsciption () {

    /**
     *  Caspars
     */
    this._socketIoService.casparAdd().subscribe((msg: string) => {
      const caspar = JSON.parse(msg);
      this.caspars.set(caspar.id, caspar);
      this.subObjectCollect(caspar.id);
    });
    this._socketIoService.casparEdit().subscribe((msg: string) => {
      const caspar = JSON.parse(msg);
      this.caspars.set(caspar.id, caspar);
    });
    this._socketIoService.casparDelete().subscribe((msg: string) => {
      const caspar = JSON.parse(msg);
      this.caspars.delete(caspar.id);
    });

    /**
     *  Consumers
     */
    this._socketIoService.consumerAdd().subscribe((data: string) => {
      let consumer = null;
      consumer = data;
      this.caspars.get(consumer.casparCommon.id).consumers.set(consumer.id, consumer);
    });

    this._socketIoService.consumerEdit().subscribe((data: string) => {
      let consumer = null;
      consumer = data;
      for (const key in consumer) {
        if (consumer.hasOwnProperty(key)) {
          const casparId = consumer.casparCommon.id;
          if ( consumer[key] !== this.caspars.get(casparId).consumers.get(consumer.id)[key]) {
            this.caspars.get(casparId).consumers.get(consumer.id)[key] = consumer[key];
          }
        }
      }
    });

    this._socketIoService.consumerDelete().subscribe((data: string) => {
      let consumer = null;
      consumer = data;
      console.log(consumer.id);
      this.caspars.get(consumer.casparCommon.id).consumers.delete(consumer.id);
    });

  //   /**
  //    *  Producers
  //    */
  //   this._socketIoService.producerAdd().subscribe((msg: string) => {
  //     const producer = JSON.parse(msg);
  //     this.producers.set(producer.id, producer);
  //   });
  //   this._socketIoService.producerEdit().subscribe((msg: string) => {
  //     const producer = JSON.parse(msg);
  //     this.producers.set(producer.id, producer);

  //   });
  //   this._socketIoService.producerDelete().subscribe((msg: string) => {
  //     const producer = JSON.parse(msg);
  //     this.producers.delete(producer.id);
  //   });

  //   /**
  //    *  Channels
  //    */
  //   this._socketIoService.channelAdd().subscribe((msg: string) => {
  //     const channel = JSON.parse(msg);
  //     this.channels.set(channel.id, channel);
  //   });
  //   this._socketIoService.channelEdit().subscribe((msg: string) => {
  //     const channel = JSON.parse(msg);
  //     this.channels.set(channel.id, channel);
  //   });
  //   this._socketIoService.channelDelete().subscribe((msg: string) => {
  //     const channel = JSON.parse(msg);
  //     this.channels.delete(channel.id);
  //   });

  //   /**
  //    *  Layers
  //    */
  //   this._socketIoService.channelAdd().subscribe((msg: string) => {
  //     const layer = JSON.parse(msg);
  //     this.consumers.set(layer.id, layer);
  //   });
  //   this._socketIoService.channelEdit().subscribe((msg: string) => {
  //     const layer = JSON.parse(msg);
  //     this.layers.set(layer.id, layer);
  //   });
  //   this._socketIoService.channelDelete().subscribe((msg: string) => {
  //     const layer = JSON.parse(msg);
  //     this.layers.delete(layer.id);
  //   });
  }




}
