import { Component, OnInit } from '@angular/core';
import { CasparsSettingsComponent } from '../settings/caspars-settings/caspars-settings.component';
import { CasparDataService } from '../caspar-data.service';
import { ApiCallService } from './../api-call.service';

import {
  trigger,
  state,
  style,
  animate,
  transition,
  // ...
} from '@angular/animations';


@Component({
  selector: 'clydeui-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.less'],
  animations: [
    trigger('appear', [
      // ...
      state('ini', style({
        left : "-100%"
      })),
      state('run', style({
        left : "0%"
      })),
      transition('ini => run', [
        animate('0.2s')
      ]),
      transition('run => ini', [
        animate('0s')
      ]),
    ])
  ]
})
export class TestComponent implements OnInit {

  casparId: Number;
  appear:   boolean = true;
  constructor(
    private _apiCallService : ApiCallService,
    public casparData: CasparDataService ) { }

  ngOnInit() {
  }

  setCasparId (casparId){
    if(this.casparId != casparId){
      this.casparId = casparId;
      this.appear = true;
      const object = this;
      setTimeout(
        function(){
          object.appear = false;
        }, 1
      )
    }else{
      this.appear = true;
      this.casparId = null;
    }

  }

  casparAdd(settings) {
    this._apiCallService.casparAdd(settings)
        .subscribe(
          data => {
            console.log('data received from casparAdd API request');
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

  casparEdit(id){

  }

  editFormShow(id){

  }

  resize(e){
    console.log(e.currentTarget);
    e.currentTarget.style.right = e.clientX;
  }

}
