import { Component, OnInit } from '@angular/core';
import { CasparsSettingsComponent } from '../settings/caspars-settings/caspars-settings.component';
import { CasparDataService } from '../caspar-data.service';
import { ApiCallService } from './../api-call.service';
import { appear, showHide } from './../style/animations'


@Component({
  selector: 'clydeui-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.less', '../settings/caspars-settings/caspars-settings.component.less'],
  animations: [
    appear, showHide
  ]
})
export class TestComponent implements OnInit {

  casparId: Number = 1;       // valeur à enlever.
  appear:   boolean = false; // à repasser à true

  producersHidden   = false;
  consumersHidden   = true;
  channelsHidden    = true;
  layersHidden      = true;
  playlistsHidden   = true;
  mediasHidden      = true;

  selectedProducerType = 'file';
  consumersType = new Map(
    [
      ['screen', 'Host Screen'],
      ['file', 'Record'],
      ['stream', 'Stream'],
      ['decklink', 'Video Card']
    ]
  );

  selectedConsumerType = 'screen';
  producersType = new Map(
    [
      ['file', 'Media'],
      ['ddr', 'Media Player'],
      ['stream', 'Stream'],
      ['decklink', 'Video Card']
    ]
  );

  cards = new Map();

  selectedProducers = [];

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
      for (let n = 0; n < this.casparData.caspars.get(this.casparId).casparCommon.decklinkCards.length; n++) {
        this.cards.set(this.casparData.caspars.get(this.casparId).casparCommon.decklinkCards[n][0], this.casparData.caspars.get(this.casparId).casparCommon.decklinkCards[n][1]);
      }
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


  producerFormSubmit(form) {
    this._apiCallService.producerAdd(this.casparId, this.selectedProducerType, form)
      .subscribe(
        data => function() {
          // console.log(JSON.stringify(data));
        }
      );
  }
  producerSelect(id){
    if (this.selectedProducers.includes(id)){
      this.selectedProducers.splice(this.selectedProducers.indexOf(id),1);
    }else{
      this.selectedProducers.push(id);
    }

  }

  selectAllProducers(){
    this.selectedProducers = new Array();
    this.casparData.caspars.get(this.casparId).producers.forEach((value, key, map) => {
      this.selectedProducers.push(key);
    });
  }

  unselectAllProducers(){
    this.selectedProducers = new Array();
  }

  deleteProducers(){
    this.selectedProducers.forEach(id => {
      this._apiCallService.producerDelete(this.casparId, id)
      .subscribe(
        data => function() {
        }
      );
    });
    this.selectedProducers = new Array();
  }


}
