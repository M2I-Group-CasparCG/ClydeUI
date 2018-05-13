import { Component, OnInit, Input } from '@angular/core';
import { SocketIoService } from '../../../../socket-io.service';
import { ApiCallService } from '../../../../api-call.service';


@Component({
  selector: 'clydeui-consumers-settings',
  templateUrl: './consumers-settings.component.html',
  styleUrls: ['./consumers-settings.component.less']
})
export class ConsumersSettingsComponent implements OnInit {

  casparId;

  @Input('casparId') set _casparId(casparId) {
    this.casparId = casparId;
    this.consumersGet();
  }

  consumers = new Map();

  constructor(
    private _apiCallService: ApiCallService,
    private _socketIo: SocketIoService) {
     }

  ngOnInit() {

        /**
     * Observers subscriptions
     */

      this._socketIo.consumerAdd()
        .subscribe((msg: string) => {
          const producer = JSON.parse(msg);
          this.consumers.set(producer.id, producer);
      });

      this._socketIo.consumerEdit()
      .subscribe((msg: string) => {
        /**
         * TO BE IMPLEMENTED
         */
      });

      this._socketIo.consumerDelete()
        .subscribe((msg: string) => {
          const producer = JSON.parse(msg);
          this.consumers.delete(producer.id);
      });

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
   *  API call to a a consumer to a caspar instance
   * @param settings
   */
  consumerAdd(settings) {
    // settings[0] = formType (producerFile, decklink, etc), settings[1] = settings of the
    this._apiCallService.consumerAdd(this.casparId, settings[0], settings[1])
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

  /**
  * API call to edit a consumer
  */
  consumerEdit() {

  }

  /**
  * API call to delete a consumer
  */
  consumerDelete(consumerId) {
    this._apiCallService.consumerDelete(this.casparId, consumerId)
      .subscribe(
        data => {
          console.log('data received from consumerDelete API request');
          console.log(JSON.stringify(data));
        },
        err => console.log(err),
        () => console.log('')
      );
  }

  consumerStart(consumerId) {
    this._apiCallService.consumerStart(this.casparId, consumerId)
      .subscribe(
        data => {
          console.log('data received from consumerStart API request');
          console.log(JSON.stringify(data));
        },
        err => console.log(err),
        () => console.log('')
      );
  }

  consumerStop(consumerId) {
    this._apiCallService.consumerStop(this.casparId, consumerId)
    .subscribe(
      data => {
        console.log('data received from consumerStop API request');
        console.log(JSON.stringify(data));
      },
      err => console.log(err),
      () => console.log('')
    );
  }


}
