import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'clydeui-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.less']
})
export class SettingsComponent implements OnInit {

  page;

  constructor() { }

  ngOnInit() {
    this.page = 'ApiSettings';
  }

  setPage(page) {
    this.page = page;
  }

}
