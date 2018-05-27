import { Component, OnInit } from '@angular/core';
import { SocketIoService } from '../socket-io.service';
import { ApiCallService } from '../api-call.service';

@Component({
  selector: 'clydeui-output-matrix',
  templateUrl: './output-matrix.component.html',
  styleUrls: ['./output-matrix.component.less']
})
export class OutputMatrixComponent implements OnInit {

  consumers = new Map();
  channels = new Map();

  constructor(
    private _apiCallService: ApiCallService,
    private _socketIo: SocketIoService) {
     }

  casparId = 0;

  ngOnInit() {

    this._socketIo.channelEdit()
    .subscribe((msg: string) => {
      console.log('layerAdd');
      const channel = JSON.parse(msg);
      this.channels.set(channel.id, channel);

    });

            /**
     * Observers subscriptions
     */

    this._socketIo.consumerAdd()
    .subscribe((msg: string) => {
      const consumer = JSON.parse(msg);
      this.consumers.set(consumer.id, consumer);
   });

    this._socketIo.consumerEdit()
    .subscribe((msg: string) => {
      const consumer = JSON.parse(msg);
      this.consumers.set(consumer.id, consumer);
    });

    this._socketIo.consumerDelete()
      .subscribe((msg: string) => {
        const consumer = JSON.parse(msg);
        this.consumers.delete(consumer.id);
    });



  }

  setCasparId(id) {
    this.casparId = id;
    this.channelsGet();
    this.consumersGet();
  }


  /**
   * API call to get all consumers of a caspar instance
   */
  consumersGet() {
    this._apiCallService.consumerGetAll(this.casparId)
      .subscribe(
        data => {
          console.log('data received from consumersGet API request');
          console.log(JSON.stringify(data));
          this.consumers = new Map();
          let result;
          result = data;
          result.forEach(element => { // 0 : consumerId, 1 consumer instance
            this.consumers.set(element[0], element[1]);
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
    this._apiCallService.channelGetAll(this.casparId)
      .subscribe(
        data => {
          console.log('data received from consumersGet API request');
          console.log(JSON.stringify(data));
          this.channels = new Map();
          let result;
          result = data;
          result.forEach(element => { // 0 : consumerId, 1 consumer instance
            this.channels.set(element[0], element[1]);
          });
        },
        err => console.log(err),
        () => console.log('')
      );
  }

  /**
   *
   */
  consumerSetChannel(consumerId, channelId) {
    const settings = new Object();
    settings['channelName'] = this.channels.get(channelId).name;
    settings['channelId'] = channelId;
    this._apiCallService.consumerEdit(this.casparId, consumerId, settings)
      .subscribe(
        data => {
          console.log('channelEdit result received');
          console.log(JSON.stringify(data));
        },
        err => console.log(err),
        () => console.log('')
      );
  }
}
