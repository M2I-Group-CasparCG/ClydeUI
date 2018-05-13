import { Component, OnInit, OnChanges, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { SocketIoService } from '../../../../socket-io.service';
import { ApiCallService } from '../../../../api-call.service';

@Component({
  selector: 'clydeui-producers-settings',
  templateUrl: './producers-settings.component.html',
  styleUrls: ['./producers-settings.component.less']
})
export class ProducersSettingsComponent implements OnInit {

  casparId;

  @Input('casparId') set _casparId(casparId) {
    this.casparId = casparId;
    this.producersGet();
  }

  producers = new Map();


  constructor(
    private _apiCallService: ApiCallService,
    private _socketIo: SocketIoService) {
     }

  ngOnInit() {

    /**
     * Observers subscriptions
     */

    this._socketIo.producerAdd()
    .subscribe((msg: string) => {
      console.log('producerAdd socket !!');
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




    this.producersGet();
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
   *  API call to a a producer to a caspar instance
   * @param settings
   */
  producerAdd(settings) {
    console.log('coucou');
    // settings[0] = formType (producerFile, decklink, etc), settings[1] = settings of the
    this._apiCallService.producerAdd(this.casparId, settings[0], settings[1])
    .subscribe(
      data => {
        console.log('data received from producerAdd API request');
        /**
         * TO DO : analyze the response and update the interface
         */
      },
      err => {
        console.log('error received from producerAdd API request');
        console.log(err);
      },
      () => console.log('')
    );
  }

  /**
  * API call to edit a producer
  */
  producerEdit() {

  }

  /**
  * API call to delete a producer
  */
  producerDelete(producerId) {
    this._apiCallService.producerDelete(this.casparId, producerId)
      .subscribe(
        data => {
          console.log('data received from producerDelete API request');
          console.log(JSON.stringify(data));
        },
        err => console.log(err),
        () => console.log('')
      );
  }

  producerStart(producerId) {
    this._apiCallService.producerStart(this.casparId, producerId)
    .subscribe(
      data => {
        console.log('data received from producerStart API request');
        console.log(JSON.stringify(data));
      },
      err => console.log(err),
      () => console.log('')
    );
  }

  producerStop(producerId) {
    this._apiCallService.producerStop(this.casparId, producerId)
      .subscribe(
        data => {
          console.log('data received from producerStop API request');
          console.log(JSON.stringify(data));
        },
        err => console.log(err),
        () => console.log('')
      );
  }
}
