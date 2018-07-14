import { Component, OnInit } from '@angular/core';
import { SocketIoService } from '../../socket-io.service';
import { ApiCallService } from '../../api-call.service';



@Component({
  selector: 'clydeui-caspars-settings',
  templateUrl: './caspars-settings.component.html',
  styleUrls: ['./caspars-settings.component.less']
})
export class CasparsSettingsComponent implements OnInit {

  caspars;

  constructor(
    private _apiCallService: ApiCallService,
    private _socketIo: SocketIoService ) { }

  ngOnInit() {

    this.caspars = new Map();

    /**
     * Observers subscriptions
     */

      this._socketIo.casparAdd()
        .subscribe((msg: string) => {
          const caspar = JSON.parse(msg);
          this.caspars.set(caspar.id, caspar);
      });

      this._socketIo.casparEdit()
      .subscribe((msg: string) => {
        const caspar = JSON.parse(msg);
        this.caspars.set(caspar.id, caspar);
      });

      this._socketIo.casparDelete()
        .subscribe((msg: string) => {
          const caspar = JSON.parse(msg);
          this.caspars.delete(caspar.id);
      });

    // first casparsGet :
    this.casparsGet();

  }

  /**
   * API call to get the caspars instaces
   * store the result in the caspars Map
   */
  casparsGet() {
    this._apiCallService.casparGetAll()
    .subscribe(
      data => {
        console.log('data received from casparGet API request');
        console.log(JSON.stringify(data));
        this.caspars = new Map();
        let result;
            result = data;
            result.forEach(element => {   // 0 = id, 1= casparInstance
              this.caspars.set(element[0], element[1]);
            });
      },
      err => console.log('error received from casparGet API request'),
        // console.log(err);
      () => console.log('')
    );
  }

  /**
   * API call to add a caspar instance
   * @param settings  settings for the caspar instance
   */
  casparAdd(settings) {
    this._apiCallService.casparAdd(settings)
        .subscribe(
          data => {
            console.log('data received from casparAdd API request');
            console.log(JSON.stringify(data));
            /**
             * TO DO : analyze the response and update the interface
             */
          },
          err => {
            console.log('error received from casparAdd API request');
            err.forEach(element => {
              console.log(element);
            });
          },
          () => console.log('casparAdd error')
        );
  }

  /**
   * API call to edit a caspar instance
   * @param casparId id of the instance
   * @param settings settings to be edited
   */
  casparEdit(casparId, settings) {
    console.log('casparEdit not implemented yet');
  }

  /**
   * API call to delete a caspar instance
   * @param casparId id of the instance
   */
  casparDelete(casparId) {
    this._apiCallService.casparDelete(casparId)
    .subscribe(
      data => {
        console.log('data received from casparDelete API request');
        console.log(JSON.stringify(data));
        /**
         * TO DO : analyze the response and update the interface
         */
      },
      err => {
        console.log('error received from casparDelete API request');
        console.log(err);
      },
      () => console.log('casparDeldete error')
    );
  }


  casparRestart(casparId) {
    this._apiCallService.casparRestart(casparId)
      .subscribe(
        data => {
          console.log(data);
        }
      );
  }

  casparIni(casparId) {
    this._apiCallService.casparIni(casparId)
    .subscribe(
      data => {
        console.log(data);
      }
    );
  }

  casparScanMedias(casparId) {
    this._apiCallService.casparScanMedias(casparId)
    .subscribe(
      data => {
        console.log(data);
      }
    );
  }
}
