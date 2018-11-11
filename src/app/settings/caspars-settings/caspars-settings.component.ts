import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { SocketIoService } from '../../socket-io.service';
import { ApiCallService } from '../../api-call.service';
import { CasparDataService } from '../../caspar-data.service';

import {
  trigger,
  state,
  style,
  animate,
  transition,
  // ...
} from '@angular/animations';


@Component({
  selector: 'clydeui-caspars-settings',
  templateUrl: './caspars-settings.component.html',
  styleUrls: ['./caspars-settings.component.less'],
  animations: [
    trigger('showHide', [
      // ...
      state('show', style({
        height: "240px"
      })),
      state('hide', style({
        height: '0px',
        padding: '0px',
        margin : '0px'
      })),
      transition('show => hide', [
        animate('0.1s')
      ]),
      transition('hide => show', [
        animate('0.1s')
      ]),
    ]),
  ]
})
export class CasparsSettingsComponent implements OnInit {

  // caspars: Map<Number, Object>;
  @Input()
  casparId: number = 0;
  @Input()
  isHidden: boolean = true;
  @Output() 
  selected: EventEmitter<any> = new EventEmitter();



  constructor(
    private _apiCallService: ApiCallService,
    public casparData: CasparDataService, ) {
  }

  toggle() {
    this.isHidden = ! this.isHidden;
    this.selected.emit(this.casparId);
  }
  
  ngOnInit() {
    // this.casparId = 2;
    // this.caspars = new Map();

    /**
     * Observers subscriptions
     */

      // this._socketIo.casparAdd()
      //   .subscribe((msg: string) => {
      //     const caspar = JSON.parse(msg);
      //     this.caspars.set(caspar.id, caspar);
      // });

      // this._socketIo.casparEdit()
      // .subscribe((msg: string) => {
      //   const caspar = JSON.parse(msg);
      //   this.caspars.set(caspar.id, caspar);
      // });

      // this._socketIo.casparDelete()
      //   .subscribe((msg: string) => {
      //     const caspar = JSON.parse(msg);
      //     this.caspars.delete(caspar.id);
      // });

    // first casparsGet :
    // this.casparsGet();

  }


  setCasparId (id) {
    this.casparId = id;
  }

  hideToggle (e) {
    const parent = e.target.parentNode.parentNode;
    parent.style.minWidth = parent.offsetWidth+'px';
    const content = e.target.parentNode.parentNode.getElementsByClassName('content')[0];
    if (content.style.display == 'none'){
      content.style.display = 'inherit';
    }else{
      content.style.display = 'none';
    }
  

  
  /**
   * API call to get the caspars instaces
   * store the result in the caspars Map
   */
  // casparsGet() {
  //   this._apiCallService.casparGetAll()
  //   .subscribe(
  //     data => {
  //       this.caspars = new Map();
  //       let result;
  //           result = data;
  //           result.forEach(element => {   // 0 = id, 1= casparInstance
  //             this.caspars.set(element[0], element[1]);
  //           });
  //     },
  //     err => console.log('error received from casparGet API request'),
  //       // console.log(err);
  //     () => console.log('')
  //   );
  // }

  //
}/**
  //  * API call to add a caspar instance
  //  * @param settings  settings for the caspar instance
  //  */
  // casparAdd(settings) {
  //   this._apiCallService.casparAdd(settings)
  //       .subscribe(
  //         data => {
  //           console.log('data received from casparAdd API request');
  //           /**
  //            * TO DO : analyze the response and update the interface
  //            */
  //         },
  //         err => {
  //           console.log('error received from casparAdd API request');
  //           err.forEach(element => {
  //             console.log(element);
  //           });
  //         },
  //         () => console.log('casparAdd error')
  //       );
  // }

  // /**
  //  * API call to edit a caspar instance
  //  * @param casparId id of the instance
  //  * @param settings settings to be edited
  //  */
  // casparEdit(casparId, settings) {
  //   console.log('casparEdit not implemented yet');
  // }

  // /**
  //  * API call to delete a caspar instance
  //  * @param casparId id of the instance
  //  */

  casparDelete(casparId) {
    console.log("delete");
    this._apiCallService.casparDelete(casparId)
    .subscribe(
      data => {},
      err => {},
      () => console.log('casparDeldete error')
    );
  }


  casparRestart(casparId) {
    console.log("restart");
    this._apiCallService.casparRestart(casparId)
      .subscribe(
        data => {
          console.log(data);
        }
      );
  }

  casparIni(casparId) {
    console.log("ini");
    this._apiCallService.casparIni(casparId)
    .subscribe(
      data => {
        console.log(data);
      }
    );
  }

  casparScanMedias(casparId) {
    console.log("scan");
    this._apiCallService.casparScanMedias(casparId)
    .subscribe(
      data => {
        console.log(data);
      }
    );
  }
}