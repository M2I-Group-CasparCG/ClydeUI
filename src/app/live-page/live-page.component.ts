import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'clydeui-live-page',
  templateUrl: './live-page.component.html',
  styleUrls: ['./live-page.component.less']
})
export class LivePageComponent implements OnInit {

  isVisibleMatrix:boolean = true;
  isVisiblePlayer:boolean = true;
  isVisibleSwitchBar2d:boolean = true;

  constructor() { }

  ngOnInit() {
  }

}
