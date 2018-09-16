import { Component, OnInit } from '@angular/core';
import { SocketIoService } from '../../socket-io.service';
import { ApiCallService } from '../../api-call.service';

@Component({
  selector: 'clydeui-hyperdecks-settings',
  templateUrl: './hyperdecks-settings.component.html',
  styleUrls: ['./hyperdecks-settings.component.less']
})
export class HyperdecksSettingsComponent implements OnInit {

  hyperdecks;

  constructor(
    private _apiCallService: ApiCallService,
    private _socketIo: SocketIoService ) { }

  ngOnInit() {
    this.hyperdecks = new Map();

    /**
     * Observers subscription
     */


    this._socketIo.hyperdeckAdd()
      .subscribe((msg: string) => {
        const hyperdeck = JSON.parse(msg);
        this.hyperdecks.set(hyperdeck.id, hyperdeck);
    });

    this._socketIo.hyperdeckEdit()
    .subscribe((msg: string) => {
      console.log('hyperdeck edit catched');
      const hyperdeckCommon = JSON.parse(msg);
      const hyperdeck = this.hyperdecks.get(hyperdeckCommon.hyperdeckId);
      hyperdeck.common = hyperdeckCommon;
      this.hyperdecks.set(hyperdeck.id, hyperdeck);
    });

    this._socketIo.hyperdeckDelete()
      .subscribe((msg: string) => {
        const hyperdeck = JSON.parse(msg);
        this.hyperdecks.delete(hyperdeck.id);
    });

    this.hyperdecksGet();
  }


  hyperdecksGet () {
    this._apiCallService.hyperdecksGetAll()
    .subscribe(
      data => {
        console.log('data received from hyperdeckGet API request');
        console.log(JSON.stringify(data));
        this.hyperdecks = new Map();
        let result;
            result = data;
            result.forEach(element => {   // 0 = id, 1= casparInstance
              this.hyperdecks.set(element[0], element[1]);
            });
      },
      err => console.log('error received from casparGet API request'),
        // console.log(err);
      () => console.log('')
    );
  }


  hyperdeckAdd(settings) {
    this._apiCallService.hyperdeckAdd(settings)
        .subscribe(
          data => {
            console.log('data received from hyperdeck API request');
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

  hyperdeckGetInfo(hyperdeckId) {
    this._apiCallService.hyperdeckGetInfos(hyperdeckId)
        .subscribe(
          data => {
            console.log('data received from casparGetInfo API request');
            console.log(JSON.stringify(data));
            /**
             * TO DO : analyze the response and update the interface
             */
          },
          err => {
            console.log('error received from casparGetInfo API request');
            err.forEach(element => {
              console.log(element);
            });
          },
          () => console.log('casparGetInfo error')
        );
  }

  hyperdeckDelete(hyperdeckId) {
    this._apiCallService.hyperdeckDelete(hyperdeckId)
        .subscribe(
          data => {
            console.log('data received from hyperdeckDelete API request');
            console.log(JSON.stringify(data));
            /**
             * TO DO : analyze the response and update the interface
             */
          },
          err => {
            console.log('error received from hyperdeckDelete API request');
            err.forEach(element => {
              console.log(element);
            });
          },
          () => console.log('hyperdeckDelete error')
        );
  }

}

