import { Component, OnInit, Output, EventEmitter} from '@angular/core';


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

  @Output() whenFormCompleted: EventEmitter<any> = new EventEmitter();
  producerFileForm = new ProducerFileForm();

  constructor() { }

  ngOnInit() {
    this.producerFileForm.type = 'file';

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
