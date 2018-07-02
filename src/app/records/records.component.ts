import { Component, OnInit } from '@angular/core';
import { ApiCallService } from '../api-call.service';
import { SocketIoService } from '../socket-io.service';

@Component({
  selector: 'clydeui-records',
  templateUrl: './records.component.html',
  styleUrls: ['./records.component.less']
})
export class RecordsComponent implements OnInit {

  casparId = 0;
  consumersFile = new Map();
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
      console.log('coucou');
      const recorder = JSON.parse(msg);
      this.consumersFile.set(recorder.id, recorder);
    });

    /**
     * Watcher
     */
    // setInterval(
    //   function() {
    //     this.consumersFile.forEach(element => {
    //       if (! this.consumersFileLastTime.has(element[0])) {
    //         this.consumersFileLastTime.set(element[0], element[1]);
    //       }else{
    //         if (this.)
    //       }

    //     });
    //     }
    //   }, 500);

  }


  getConsumersFile() {
    this._apiCallService.consumerGetAll(this.casparId)
    .subscribe(
       data => {
        this.consumersFile = new Map();
        let element = null;
           element = data;
           element.forEach(consumer => {
             console.log(JSON.stringify(consumer));
             if (consumer[1].type === 'FILE') {
              this.consumersFile.set(consumer[0], consumer[1]);
             }
           });
       }
    );
  }

  setCasparId(id) {
    this.casparId = id;
    this.getConsumersFile();
  }



}
