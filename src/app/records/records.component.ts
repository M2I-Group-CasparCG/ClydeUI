import { Component, OnInit } from '@angular/core';
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
      console.log('hyperdeck edit catched');
      const hyperdeckCommon = JSON.parse(msg);
      const hyperdeck = this.hyperdecks.get(hyperdeckCommon.hyperdeckId);
      console.log(hyperdeck);
      hyperdeck.common = hyperdeckCommon;
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


}
