import { Component, OnInit } from '@angular/core';
import { ApiCallService } from '../api-call.service';
import { SocketIoService } from '../socket-io.service';
import { CasparGetService } from '../caspar-get.service';

class LayerGeometry {
  scale: number;
  horizontal: number;
  vertical: number;
}

@Component({
  selector: 'clydeui-switch-bar-2d',
  templateUrl: './switch-bar-2d.component.html',
  styleUrls: [
    './switch-bar-2d.component.less',
    '../style/common.less']
})
export class SwitchBar2dComponent implements OnInit {


  casparId = null;
  producers = new Map();
  channels = new Map();
  layers = new Map();

  selectedChannel = 1;
  selectedProducer = 0;

  layerGeometry = new LayerGeometry();
  geometryGap = 0.01;

  constructor(  private _apiCallService: ApiCallService,
                private _socketIo: SocketIoService,
                private _casparGetService: CasparGetService ) { }

  ngOnInit() {

    /**
     * Observers subscriptions
     */

    this._socketIo.producerAdd()
    .subscribe((msg: string) => {
      const producer = JSON.parse(msg);
      this.producers.set(producer.id, producer);
    });

    this._socketIo.producerEdit()
    .subscribe((msg: string) => {
      /**
       * TO BE IMPLEMENTED
       */
    });

    this._socketIo.producerDelete()
      .subscribe((msg: string) => {
        const producer = JSON.parse(msg);
        this.producers.delete(producer.id);
    });

    this._socketIo.channelEdit()
    .subscribe((msg: string) => {
      console.log('layerAdd');
      const channel = JSON.parse(msg);
      this.channels.set(channel.id, channel);
      if (channel.id === this.selectedChannel ) {
        this.selectedProducer = this.channels.get(channel.id).selectedInput;
      }
    });

    this._socketIo.layerAdd()
    .subscribe((msg: string) => {
      const layer = JSON.parse(msg);
      this.layers.set(layer.id, layer);
      console.log(msg);
    });

    this._socketIo.layerEdit()
      .subscribe((msg: string) => {
        console.log(JSON.stringify(msg));
        const layer = JSON.parse(msg);
        this.layers.set(layer.id, layer);
      });

      this._socketIo.layerDelete()
      .subscribe((msg: string) => {
        const layer = JSON.parse(msg);
        this.layers.delete(layer.id);
      });
      // todo : add channels sockets

  }

  setCasparId(id) {
    this.casparId = id;
    this.producersGet();
    this.channelsGet();
    this.layersGet();
  }


  /**
   * API call to get all producers of a caspar instance
   */
  producersGet() {
    console.log('producerGet ' + this.casparId);
    this._apiCallService.producerGetAll(this.casparId)
      .subscribe(
        data => {
          this.producers = new Map();
          let result;
          result = data;
          result.forEach(element => { // 0 : producerId, 1 producer instance
            this.producers.set(element[0], element[1]);
          });
        },
        err => console.log(err),
        () => console.log('')
      );
  }

   /**
   * API call to get all channels of a caspar instance
   */
  channelsGet() {
    console.log('channelsGet ' + this.casparId);
    this._apiCallService.channelGetAll(this.casparId)
      .subscribe(
        data => {
          this.channels = new Map();
          let result;
          result = data;
          result.forEach(element => { // 0 : producerId, 1 producer instance
            this.channels.set(element[0], element[1]);
          });
        },
        err => console.log(err),
        () => console.log('')
      );
  }

  layersGet() {
    console.log('layersGet ' + this.casparId);
    this._apiCallService.layerGetAll(this.casparId)
      .subscribe(
        data => {
          this.layers = new Map();
          let result;
          result = data;
          result.forEach(element => { // 0 : producerId, 1 producer instance
            this.layers.set(element[0], element[1]);
          });
        },
        err => console.log(err),
        () => console.log('')
      );
  }

  channelSelect(channelId) {
    this.selectedChannel = channelId;
    this.selectedProducer = this.channels.get(this.selectedChannel).selectedInput;
    console.log(this.selectedProducer);
  }

  channelSetInput(inputId, channelId= this.selectedChannel) {
    console.log('setInput');
    this._apiCallService.channelSetInput(this.casparId, channelId, inputId)
      .subscribe(
        data => {
          console.log('setInput result received');
          console.log(JSON.stringify(data));
        },
        err => console.log(err),
        () => console.log('')
      );
  }

  /**
   *  API call to add a layer to a caspar instance
   * @param settings
   */
  layerAdd(settings) {
    settings = new Object();
    settings['name'] = 'DSK' + (this.layers.size + 1);
    settings['channelId'] = 2;
    this._apiCallService.layerAdd(this.casparId, settings)
    .subscribe(
      data => {
        console.log('data received from consumerAdd API request');
        console.log(JSON.stringify(data));
        /**
         * TO DO : analyze the response and update the interface
         */
      },
      err => {
        console.log('error received from consumerAdd API request');
        console.log(err);
      },
      () => console.log('')
    );
  }

  layerSetInput(inputId, layerId) {
    console.log('setInput');
    this._apiCallService.layerSetInput(this.casparId, layerId, inputId)
      .subscribe(
        data => {
          console.log('setInput result received');
          console.log(JSON.stringify(data));
        },
        err => console.log(err),
        () => console.log('')
      );
  }

  layerStart(layerId) {
    console.log('layerStart');
    this._apiCallService.layerStart(this.casparId, layerId)
    .subscribe(
      data => {
        console.log('layerStart response received');
        console.log(JSON.stringify(data));
      },
      err => console.log(err),
      () => console.log('')
    );
  }

  layerStop(layerId) {
    console.log('layerStart');
    this._apiCallService.layerStop(this.casparId, layerId)
    .subscribe(
      data => {
        console.log('layerStop response received');
        console.log(JSON.stringify(data));
      },
      err => console.log(err),
      () => console.log('')
    );
  }

  layerToggle(layerId) {
    if (this.layers.get(layerId).isActive) {
      this.layerStop(layerId);
    } else {
      this.layerStart(layerId);
    }
  }

  layerDelete(layerId) {
    console.log('layerDelete');
    this._apiCallService.layerDelete(this.casparId, layerId)
    .subscribe(
      data => {
        console.log('layerDelete response received');
        console.log(JSON.stringify(data));
      },
      err => console.log(err),
      () => console.log('')
    );
  }

  precisionRound(number, precision) {
    const factor = Math.pow(10, precision);
    return Math.round(number * factor) / factor;
  }

  layerGeometryUpdate(layerId, valueName, value) {

    const layer = this.layers.get(layerId);

    const settings = new Object();

    this.layerGeometry.horizontal = this.precisionRound(this.layerGeometry.horizontal, 2);
    this.layerGeometry.vertical = this.precisionRound(this.layerGeometry.vertical, 2);
    this.layerGeometry.scale = this.precisionRound(this.layerGeometry.scale, 2);

    settings['posX'] = this.layerGeometry.horizontal || layer.posX;
    settings['posY'] = this.layerGeometry.vertical || layer.posY;
    settings['scaleX'] = this.layerGeometry.scale || layer.scaleX;
    settings['scaleY'] = this.layerGeometry.scale || layer.scaleY;

    if ( settings['scaleX'] !== layer.scaleX  || settings['scaleY'] !== layer.scaleX
    || settings['posX'] !==  layer.posX || settings['posY'] !== layer.posY ) {
//
      this._apiCallService.layerEdit(this.casparId, layerId, settings)
      .subscribe(
        data => {
          console.log('setInput result received');
          console.log(JSON.stringify(data));
        },
        err => console.log(err),
        () => console.log('')
      );

    }
    }

    layerReset(layerId) {

      const settings = new Object();



      settings['posX'] = 0;
      settings['posY'] = 0;
      settings['scaleX'] = 1;
      settings['scaleY'] = 1;

      this._apiCallService.layerEdit(this.casparId, layerId, settings)
      .subscribe(
        data => {
          console.log('setInput result received');
          console.log(JSON.stringify(data));

          this.layerGeometry.horizontal = 0;
          this.layerGeometry.vertical = 0;
          this.layerGeometry.scale = 0;
        },
        err => console.log(err),
        () => console.log('')
      );
    }
  autoTransition() {

    const crtPgm = this.channels.get(2).selectedInput;
    const crtPvw = this.channels.get(3).selectedInput;

    this._apiCallService.channelSetInput(this.casparId, 2, crtPvw)
      .subscribe(
        data => {
          console.log('setInput result received');
          console.log(JSON.stringify(data));
        },
        err => console.log(err),
        () => console.log('')
      );


    this._apiCallService.channelSetInput(this.casparId, 3, crtPgm)
      .subscribe(
        data => {
          console.log('setInput result received');
          console.log(JSON.stringify(data));
        },
        err => console.log(err),
        () => console.log('')
      );
  }
}
