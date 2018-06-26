import { Component, OnInit, Output, EventEmitter } from '@angular/core';

class DdrFileForm {
  type: string;
  name: string;
  errorMessage: string;
}

@Component({
  selector: 'clydeui-ddr-producer-form',
  templateUrl: './ddr-producer-form.component.html',
  styleUrls: ['../producer-form.component.less']
})
export class DdrProducerFormComponent implements OnInit {

  @Output() whenFormCompleted: EventEmitter<any> = new EventEmitter();
  ddrFileForm = new DdrFileForm();

  constructor() { }

  ngOnInit() {
    this.ddrFileForm.type = 'ddr';
  }

  ddrAdd() {
    console.log('producerAdd');
    console.log(this.ddrFileForm.type);
    const settings = new Object();
        settings['name'] = this.ddrFileForm.name;
        this.whenFormCompleted.emit([this.ddrFileForm.type, this.ddrFileForm]);
  }

}
