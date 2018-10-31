import { Component, OnInit } from '@angular/core';
import { CasparDataService } from '../caspar-data.service';

@Component({
  selector: 'clydeui-live-page',
  templateUrl: './live-page.component.html',
  styleUrls: ['./live-page.component.less']
})
export class LivePageComponent implements OnInit {

  isVisibleMatrix:boolean = true;
  isVisiblePlayer:boolean = true;
  isVisibleSwitchBar2d:boolean = true;

  constructor( public casparData: CasparDataService) { }

  ngOnInit() {
  }

}
