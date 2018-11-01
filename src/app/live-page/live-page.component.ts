import { Component } from '@angular/core';
import { CasparDataService } from '../caspar-data.service';


@Component({
  selector: 'clydeui-live-page',
  templateUrl: './live-page.component.html',
  styleUrls: ['./live-page.component.less']
})
export class LivePageComponent {

  isVisibleMatrix:boolean = true;
  isVisiblePlayer:boolean = true;
  isVisibleSwitchBar2d:boolean = true;
  casparId: Number;

  constructor( public casparData: CasparDataService) {
    // this.setCasparId(this.casparData.caspars.keys().next().value);
  }


  setCasparId ( id ) {
    this.casparId = id;
    console.log(id);
  }

}
