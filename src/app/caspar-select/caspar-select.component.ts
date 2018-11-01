import { Component, Output, EventEmitter, OnInit, AfterViewChecked } from '@angular/core';

import { CasparDataService } from '../caspar-data.service';

@Component({
  selector: 'clydeui-caspar-select',
  templateUrl: './caspar-select.component.html',
  styleUrls: ['./caspar-select.component.less']
})



export class CasparSelectComponent implements OnInit, AfterViewChecked {

  @Output() select: EventEmitter<any> = new EventEmitter();
  casparId: number;

  constructor( public casparData: CasparDataService) {
  }
  ngOnInit() {
    this.setCasparId(this.casparData.caspars.keys().next().value);
  }

  // ngAfterContentInit(): void {
  //   this.setCasparId(this.casparData.caspars.keys().next().value);
  // }
  ngAfterViewChecked(): void {
    if (!this.casparId ) {
      this.setCasparId(this.casparData.caspars.keys().next().value);
    }
  }

  setCasparId ( id ) {
    this.casparId = parseInt(id, 10);
    this.select.emit(this.casparId);
  }

}
