import { Component, OnInit, TemplateRef } from '@angular/core';
import { ApiCallService } from '../api-call.service';
import { SocketIoService } from '../socket-io.service';

class RecorderSatus {
  id: number;
  started: boolean;
  duration: 'string';
}

@Component({
  selector: 'clydeui-records',
  templateUrl: './records.component.html',
  styleUrls: ['./records.component.less']
})
export class RecordsComponent implements OnInit {

  hyperdecks;
  casparId = 0;
  consumersFile = new Map();
  recordersSatus = new Map();
  consumersFileLastTime = new Map();

  modalWindow = false;
  modalWindowTitle: String;
  modalWindowButtons: Array<Object>;
  modalWindowContent: String;
  modalWindowWidth: number;
  modalWindowHeight: number;
  modalWindowCallback: Function;

  test = true;

  constructor(
    private _apiCallService: ApiCallService,
    private _socketIoService: SocketIoService ) { }

  ngOnInit() {

    /**
     * Consumers events
     */
    this._socketIoService.consumerAdd()
      .subscribe((msg: string) => {
        const consumer = JSON.parse(msg);
        if (consumer.type === 'FILE') {
          this.consumersFile.set(consumer.id, consumer);
        }
    });
    this._socketIoService.consumerEdit()
    .subscribe((msg: string) => {
      const consumer = JSON.parse(msg);
      if (consumer.type === 'FILE') {
        this.consumersFile.set(consumer.id, consumer);
      }
    });
    this._socketIoService.consumerDelete()
    .subscribe((msg: string) => {
      const consumer = JSON.parse(msg);
      if (consumer.type === 'FILE') {
        this.consumersFile.delete(consumer.id);
      }
    });

    /**
     * RecorderEdvent
     */
    this._socketIoService.recorderEdit()
    .subscribe((msg: string) => {
      const recorder = JSON.parse(msg);
      this.consumersFile.set(recorder.id, recorder);
    });


    /**
     * Hyperdeck events
     */

    this._socketIoService.hyperdeckAdd()
    .subscribe((msg: string) => {
      const hyperdeck = JSON.parse(msg);
      this.hyperdecks.set(hyperdeck.id, hyperdeck);
    });

    this._socketIoService.hyperdeckEdit()
    .subscribe((msg: string) => {
      const hyperdeckCommon = JSON.parse(msg);
      const hyperdeck = this.hyperdecks.get(hyperdeckCommon.hyperdeckId);
      for (const [key, value] of Object.entries(hyperdeckCommon)) {
        hyperdeck.common[key] = value;
      }
      this.hyperdecks.set(hyperdeck.id, hyperdeck);
    });

    this._socketIoService.hyperdeckDelete()
      .subscribe((msg: string) => {
        const hyperdeck = JSON.parse(msg);
        this.hyperdecks.delete(hyperdeck.id);
    });

    this.hyperdecksGet();
  }


  getConsumersFile() {
    this._apiCallService.consumerGetAll(this.casparId)
    .subscribe(
       data => {
        this.consumersFile = new Map();
        let element = null;
           element = data;
           element.forEach(consumer => {
             if (consumer[1].type === 'FILE') {
              this.consumersFile.set(consumer[0], consumer[1]);
              this.recordersSatus.set(consumer[0], new RecorderSatus());
             }
           });
       }
    );
  }

  setCasparId(id) {
    this.casparId = id;
    this.getConsumersFile();
  }

  consumerStartStop(id) {
    console.log('start top');
    console.log(id);
    console.log(this.consumersFile.get(id).started);
    if (this.consumersFile.get(id).started) {
      this._apiCallService.consumerStop(this.casparId, id)
      .subscribe(
        data => {
          console.log(data);
        });
    } else {
      this._apiCallService.consumerStart(this.casparId, id)
      .subscribe(
        data => {
          console.log(data);
        });
    }
  }

  consumerStart(id) {
      this._apiCallService.consumerStart(this.casparId, id)
      .subscribe(
        data => {
          console.log(JSON.stringify(data));
        });
    }
    consumerStop(id) {
      this._apiCallService.consumerStop(this.casparId, id)
      .subscribe(
        data => {
          console.log(JSON.stringify(data));
        });
    }

    hyperdecksGet () {
      this._apiCallService.hyperdecksGetAll()
      .subscribe(
        data => {
          console.log('data received from hyperdeckGet API request');
          console.log(JSON.stringify(data));
          this.hyperdecks = new Map();
          let result;
              result = data;
              result.forEach(element => {   // 0 = id, 1= casparInstance
                console.log(JSON.stringify(element));
                this.hyperdecks.set(element[0], element[1]);
              });
        },
        err => console.log('error received from casparGet API request'),
          // console.log(err);
        () => console.log('')
      );
    }

    hyperdeckEdit (hyperdeckId, settings) {
      this._apiCallService.hyperdeckEdit(hyperdeckId, settings)
      .subscribe(
        data => {
          console.log('data received from hyperdeckEdit API request');
          console.log(JSON.stringify(data));

        },
        err => console.log('error received from hyperdeckEdit API request'),
          // console.log(err);
        () => console.log('')
      );
    }

    hyperdeckGroupedToggle (hyperdeckId) {
      const hyperdeck = this.hyperdecks.get(hyperdeckId);
      const settings = new Object();
            settings['grouped'] = ! hyperdeck.common.grouped;
      this.hyperdeckEdit(hyperdeckId, settings);
    }

    hyperdeckControl (hyperdeckId, controlType) {
      this._apiCallService.hyperdeckControl(hyperdeckId, controlType)
      .subscribe(
        data => {
          console.log('data received from hyperdeckGet API request');
          console.log(JSON.stringify(data));

        },
        err => console.log('error received from casparGet API request'),
          // console.log(err);
        () => console.log('')
      );
    }

    setModalWindow(boolean) {
      this.modalWindow = boolean;
    }

    closeModalWindow() {
      this.setModalWindow(false);
    }

    setModalWindowHyperdeckInfos(id) {
      this.modalWindowTitle = 'Hyperdeck Informations';
      this.modalWindowButtons = [{label: 'Close', callback: this.closeModalWindow.bind(this) }];
      this.modalWindowContent = '<ul>';
      const hyperdeck = this.hyperdecks.get(id).common;
      for ( const key in hyperdeck) {
        if (hyperdeck.hasOwnProperty(key)) {
          this.modalWindowContent += `
            <li>
              <label>
                ${key}
              </label>
              <span>
              ${hyperdeck[key]}
              </span>
            </li>`;
         }
      }
      this.modalWindowContent += `
      </ul>
      <style>li{display:block; text-align : left;}
      label{width:160px; text-align : right; margin-right : 10px; display:inline-block;}</style>`;
      this.modalWindowWidth = 500;
      this.modalWindowHeight = 800;

      this.setModalWindow(true);
    }

    setModalWindowHyperdeckDelete(id) {
      this.modalWindowTitle = 'Hyperdeck Delete';
      this.modalWindowButtons = [{label: 'Delete', callback: this.hyperdeckDelete.bind(this), param: id},
                                 {label: 'Cancel', callback: this.closeModalWindow.bind(this)}];
      this.modalWindowContent = `/!\\ Are you sure to want to delete hyperdeck ${this.hyperdecks.get(id).common.name} ?`;
      this.modalWindowWidth = 300;
      this.modalWindowHeight = 300;
      this.setModalWindow(true);
    }

    hyperdeckDelete(hyperdeckId) {
      this._apiCallService.hyperdeckDelete(hyperdeckId)
          .subscribe(
            data => {
              console.log('data received from hyperdeckDelete API request');
              console.log(JSON.stringify(data));
              /**
               * TO DO : analyze the response and update the interface
               */
            },
            err => {
              console.log('error received from hyperdeckDelete API request');
              err.forEach(element => {
                console.log(element);
              });
            },
            () => console.log('hyperdeckDelete error')
          );
      this.setModalWindow(false);
    }

    // setModalWindowTest() {
    //   this.modalWindowTitle = 'Hyperdeck Delete';
    //   this.modalWindowButtons = [{label: 'Delete', callback: this.testToogle.bind(this) },
    //                             {label: 'Cancel', callback: this.testToogle.bind(this) }];
    //   this.modalWindowContent = `/!\\ Are you sure to want to delete hyperdeck ?`;
    //   this.modalWindowWidth = 300;
    //   this.modalWindowHeight = 300;
    //   this.modalWindowCallback = this.testToogle.bind(this);
    //   this.setModalWindow(true);
    // }


    // modalWindowCallbackAction(event) {

    //   console.log(event);
    //   switch (event) {
    //     case 'Exit' :
    //     case 'Cancel' :
    //     case 'close' : {
    //       this.setModalWindow(false);
    //     }break;
    //     case 'Delete' : {
    //       this.hyperdecks.delete();
    //     }break;
    //   }
    // }
}
