import { Component, OnInit } from '@angular/core';
import { CasparsSettingsComponent } from '../settings/caspars-settings/caspars-settings.component';
import { CasparDataService } from '../caspar-data.service';
import { ApiCallService } from './../api-call.service';
import { appear, showHide } from './../style/animations'

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
  styleUrls: ['./test.component.less', '../settings/caspars-settings/caspars-settings.component.less'],
  animations: [
    appear, showHide
  ]
})
export class TestComponent implements OnInit {

  casparId: Number;
  appear:   boolean = true;settings

  producersHidden   = true;
  consumersHidden   = true;
  channelsHidden    = true;
  layersHidden      = true;
  playlistsHidden   = true;
  mediasHidden      = true;

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
          data => { this.producersHidden
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

  show(object){
    console.log(object);
    switch (object){
      case 'producers' : {
        this.producersHidden =  ! this.producersHidden;
        console.log(this.producersHidden);
      }break;
      case 'consumers' : {
        this.consumersHidden = ! this.consumersHidden;
        console.log(this.consumersHidden);
      }break;
      case 'channels' : {
        this.channelsHidden =  ! this.channelsHidden;
        console.log(this.channelsHidden);
      }break;
      case 'layers' : {
        this.layersHidden = ! this.layersHidden;
        console.log(this.layersHidden);
      }break;
      case 'playlists' : {
        this.playlistsHidden = ! this.playlistsHidden;
        console.log(this.playlistsHidden);
      }break;
      case 'medias' : {
        this.mediasHidden = ! this.mediasHidden;
        console.log(this.mediasHidden);
      }break;
    }
  }

}
