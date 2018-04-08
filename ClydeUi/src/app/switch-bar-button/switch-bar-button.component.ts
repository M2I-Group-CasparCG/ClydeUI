import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-switch-bar-button',
  templateUrl: './switch-bar-button.component.html',
  styleUrls: ['./switch-bar-button.component.css']
})
export class SwitchBarButtonComponent implements OnInit {

  public type;
  public elementId;

  constructor() { }

  ngOnInit() {
  }

}
