import { Component, OnInit } from '@angular/core';
import { SocketIoService } from '../socket-io.service';
import { ApiCallService } from '../api-call.service';


@Component({
  selector: 'clydeui-caspars-list',
  templateUrl: './caspars-list.component.html',
  styleUrls: ['./caspars-list.component.less']
})
export class CasparsListComponent implements OnInit {

  private result;
  caspars = new Map();

  constructor( private _apiCallService: ApiCallService, private _socketIo: SocketIoService ) { }

  ngOnInit() {

    this._socketIo.casparAdd()
      .subscribe((msg: string) => {
        const caspar = JSON.parse(msg);
        this.caspars.set(caspar.id, caspar);
    });

    this._socketIo.casparDelete()
    .subscribe((msg: string) => {
      const caspar = JSON.parse(msg);
      this.caspars.delete(caspar.id);
  });

    this.casparsGet();

  }

  casparsGet() {
    this._apiCallService.casparGetAll()
    .subscribe(
      data => {
        this.result = data;
        this.result.forEach(element => {
          this.caspars.set(element[0], element[1]);
        });
      },
      err => console.log(err),
      () => console.log('')
    );
  }

  casparEdit(event) {

  }

  casparDelete(event) {
    const casparId = event.target.getAttribute('name');
    this._apiCallService.casparDelete(casparId).subscribe(
      data => {
        console.log(data['description']);
      }
    );
  }

}
