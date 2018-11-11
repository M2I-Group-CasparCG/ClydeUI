import { Component, OnInit } from '@angular/core';
import { CasparsSettingsComponent } from '../settings/caspars-settings/caspars-settings.component';
import { CasparDataService } from '../caspar-data.service';
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
        // left : "-100px;",
        // width : "0px",
        // postition : "relative",
        left : "-100%"
        // display : "none"
      })),
      state('run', style({
        // width : "500px",
        // postition : "relative",
        left : "0%"
        // display : "none"
      })),
      transition('ini => run', [
        animate('0.2s')
      ]),
      transition('run => ini', [
        animate('0s')
      ]),
    ]),
  ]
})
export class TestComponent implements OnInit {

  casparId: Number;
  appear: boolean = true;
  constructor( public casparData: CasparDataService) { }

  ngOnInit() {
  }

  setCasparId (casparId){
   
    if(this.casparId != casparId){
      this.casparId = casparId;
      this.appear = true;
      const test = this;
      setTimeout(
        function(){
          test.appear = false;
        }, 1
      )
    }else{
      this.appear = true;
      this.casparId = null;
    }
    
  }

}
