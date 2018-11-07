import { Injectable } from '@angular/core';
import { ApiCallService } from './api-call.service';
import { SocketIoService } from './socket-io.service';

@Injectable()
export class CasparDataService {

  caspars     = new Map();

  constructor(
    private _apiCallService: ApiCallService,
    private _socketIoService: SocketIoService
  ) {
    
    // setTimeout(
    //   () => {
        this.socketIoSubsciption();
        this.apiCallCollect();
    //   }, 1000
    // )
  }


  /**
   * Makes the api call to collect all the availables caspar instances
   * Stores the data in the caspar Map.
   * Execute the subObjectCollect() method for each caspar instance received.
   */
  async apiCallCollect () {
    this.caspars     = new Map();
    /**
     * Caspars
     */
    this._apiCallService.casparGetAll().subscribe(data => {
      let element = null;
          element = data;
          element.forEach(caspar => {
            this.caspars.set(caspar[0], caspar[1]);
            this.subObjectCollect(caspar[0]);
        });
      }
    );
  }

  /**
   * Makes all the api call necessary to collect all sub-objects of a caspar istance
   * consumers, producers, channel, layers, media
   * Stores this informations in the caspars Map.
   */
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
          this._apiCallService.mediasGetAll(id).subscribe(data_ => {
            const medias = new Map();
            let element_ = null;
                element_ = data_;
                element_.forEach(media => {
                  medias.set(media[0], media[1]);
                });
            this.caspars.get(id)['medias'] = medias;
          });
  }

  /**
   * Subrscribes to all socketIo events
   * Upadates the caspars Map according to the data received
   */
  socketIoSubsciption () {

    /**
     *  Caspars
     */
    this._socketIoService.casparAdd().subscribe((data: string) => {
      let caspar = null;
      caspar = data;
      this.caspars.set(caspar.id, caspar);
      this.subObjectCollect(caspar.id);
    });
    this._socketIoService.casparEdit().subscribe((data: string) => {
      let caspar = null;
      caspar = data;
      for (const key in caspar) {
        if (caspar.hasOwnProperty(key)) {
          if ( caspar[key] !== this.caspars.get(caspar.id)[key]) {
            this.caspars.get(caspar.id)[key] = caspar[key];
          }
        }
      }
    });
    this._socketIoService.casparDelete().subscribe((data: string) => {
      let caspar = null;
      caspar = data;
      this.caspars.delete(caspar.id);
    });


    /**
     *  Consumers
     */
    this._socketIoService.consumerAdd().subscribe((data: string) => {
      console.log('[CasparDataService] socketIo consumerAdd');
      let consumer = null;
      consumer = data;
      this.caspars.get(consumer.casparCommon.id).consumers.set(consumer.id, consumer);
    });

    this._socketIoService.consumerEdit().subscribe((data: string) => {
      console.log('[CasparDataService] socketIo consumerEdit');
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
      console.log('[CasparDataService] socketIo consumerDelete');
      let consumer = null;
      consumer = data;
      this.caspars.get(consumer.casparCommon.id).consumers.delete(consumer.id);
    });


    /**
     *  Producers
     */
    this._socketIoService.producerAdd().subscribe((data: string) => {
      console.log('[CasparDataService] socketIo producerAdd');
      let producer = null;
      producer = data;
      this.caspars.get(producer.casparCommon.id).producers.set(producer.id, producer);
    });

    this._socketIoService.producerEdit().subscribe((data: string) => {
      console.log('[CasparDataService] socketIo producerEdit');
      let producer = null;
      producer = data;
      for (const key in producer) {
        if (producer.hasOwnProperty(key)) {
          const casparId = producer.casparCommon.id;
          if ( producer[key] !== this.caspars.get(casparId).producers.get(producer.id)[key]) {
            this.caspars.get(casparId).producers.get(producer.id)[key] = producer[key];
          }
        }
      }
    });
    this._socketIoService.producerDelete().subscribe((data: string) => {
      console.log('[CasparDataService] socketIo producerDelete');
      let producer = null;
      producer = data;
      this.caspars.get(producer.casparCommon.id).producers.delete(producer.id);
    });


    /**
     *  Channels
     */
    this._socketIoService.channelAdd().subscribe((data: string) => {
      console.log('[CasparDataService] socketIo channelAdd');
      let channel = null;
      channel = data;
      this.caspars.get(channel.casparCommon.id).channels.set(channel.id, channel);
    });

    this._socketIoService.channelEdit().subscribe((data: string) => {
      console.log('[CasparDataService] socketIo channelEdit');
      let channel = null;
      channel = data;
      for (const key in channel) {
        if (channel.hasOwnProperty(key)) {
          const casparId = channel.casparCommon.id;
          if ( channel[key] !== this.caspars.get(casparId).channels.get(channel.id)[key]) {
            this.caspars.get(casparId).channels.get(channel.id)[key] = channel[key];
          }
        }
      }
    });
    this._socketIoService.producerDelete().subscribe((data: string) => {
      console.log('[CasparDataService] socketIo channelDelete');
      let channel = null;
      channel = data;
      this.caspars.get(channel.casparCommon.id).channels.delete(channel.id);
    });

    /**
     *  Layers
     */
    this._socketIoService.layerAdd().subscribe((data: string) => {
      console.log('[CasparDataService] socketIo layerAdd');
      let layer = null;
      layer = data;
      this.caspars.get(layer.casparCommon.id).layers.set(layer.id, layer);
    });

    this._socketIoService.layerEdit().subscribe((data: string) => {
      console.log('[CasparDataService] socketIo layerEdit');
      let layer = null;
      layer = data;
      for (const key in layer) {
        if (layer.hasOwnProperty(key)) {
          const casparId = layer.casparCommon.id;
          if ( layer[key] !== this.caspars.get(casparId).layers.get(layer.id)[key]) {
            this.caspars.get(casparId).layers.get(layer.id)[key] = layer[key];
          }
        }
      }
    });
    this._socketIoService.layerDelete().subscribe((data: string) => {
      console.log('[CasparDataService] socketIo layerDelete');
      let layer = null;
      layer = data;
      this.caspars.get(layer.casparCommon.id).layers.delete(layer.id);
    });
  }




}
