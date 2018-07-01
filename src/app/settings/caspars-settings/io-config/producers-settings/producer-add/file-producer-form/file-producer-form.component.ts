import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { ApiCallService } from './../../../../../../api-call.service';

class ProducerFileForm {
  type: string;
  name: string;
  fileName: string;
  playMode: string;
  errorMessage: string;
  settings: Object;
}

@Component({
  selector: 'clydeui-file-producer-form',
  templateUrl: './file-producer-form.component.html',
  styleUrls: ['../producer-form.component.less']
})
export class FileProducerFormComponent implements OnInit {

  casparId;
  caspar;
  medias = new Map();

  @Input('casparId') set _casparId(casparId) {
    this.casparId = casparId;
    this.getMedias();
  }

  @Output() whenFormCompleted: EventEmitter<any> = new EventEmitter();
  producerFileForm = new ProducerFileForm();

  constructor(private _apiCallService: ApiCallService) { }

  ngOnInit() {
    this.producerFileForm.type = 'file';

  }

  getMedias() {

    this._apiCallService.casparGetMedias(this.casparId)
      .subscribe(
        data => {
          this.medias = new Map();
          let element = null;
          element = data;
          element.forEach(media => {
            this.medias.set(media[0], media[1]);
          });
        }
      );
  }

  producerAdd() {
    console.log('producerAdd');
    console.log(this.producerFileForm.type);
    const settings = new Object();
        settings['name'] = this.producerFileForm.name;
        settings['fileName'] = this.producerFileForm.fileName;
        settings['playMode'] = this.producerFileForm.playMode;
    this.producerFileForm.settings = settings;
    this.whenFormCompleted.emit([this.producerFileForm.type, this.producerFileForm]);
  }

}
