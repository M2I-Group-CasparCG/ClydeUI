import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CasparsSettingsComponent } from '../settings/caspars-settings/caspars-settings.component';
import { SocketIoService } from '../socket-io.service';
import { ApiCallService } from '../api-call.service';
import { Injectable } from '@angular/core';

@Component({
  selector: 'clydeui-caspar-select',
  templateUrl: './caspar-select.component.html',
  styleUrls: ['./caspar-select.component.less']
})



export class CasparSelectComponent implements OnInit {

  public selectedCasparId;
  @Output() select: EventEmitter<any> = new EventEmitter();

  public caspars = new Map();

  constructor( private _apiCallService: ApiCallService, private _socketIo: SocketIoService) {
    // super(_apiCallService, _socketIo);
  }

  ngOnInit() {

      this._socketIo.casparAdd()
      .subscribe((msg: string) => {
        const caspar = JSON.parse(msg);
        this.caspars.set(caspar.id, caspar);
    });

    this._socketIo.casparEdit()
    .subscribe((msg: string) => {
      /**
       * TO BE IMPLEMENTED
       */
    });

    this._socketIo.casparDelete()
      .subscribe((msg: string) => {
        const caspar = JSON.parse(msg);
        this.caspars.delete(caspar.id);
    });
    // super.ngOnInit();
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
        this.selectedCasparId = this.caspars.keys().next().value;
        this.select.emit(this.selectedCasparId);
      },
      err => console.log('error received from casparGet API request'),
        // console.log(err);
      () => console.log('')
    );
  }

  selectSubmit(event) {
    this.selectedCasparId = event.target.value;
    this.select.emit(this.selectedCasparId);
  }

}
