import { Component, OnInit } from '@angular/core';
import { ApiCallService } from '../api-call.service';
import { SocketIoService } from '../socket-io.service';

@Component({
  selector: 'clydeui-switch-bar-2d',
  templateUrl: './switch-bar-2d.component.html',
  styleUrls: ['./switch-bar-2d.component.less']
})
export class SwitchBar2dComponent implements OnInit {

  private result;
  public inputs = new Map();
  public channels = new Map();
  private selectedChannel = '1';
  private selectedInput = '1';

  constructor( private _apiCallService: ApiCallService, private _socketIo: SocketIoService ) { }

  ngOnInit() {
    this.ini();

    // this._socketIo.producerAdded()
    //   .subscribe((msg: string) => {
    //     const producer = JSON.parse(msg);
    //     this.inputs.set(producer.id, producer);
    //   });

    // this._socketIo.producerRemoved()
    //   .subscribe((msg: string) => {
    //     this.inputs.delete(JSON.parse(msg));
    //   });

    // this._socketIo.channelAdded()
    //   .subscribe((msg: string) => {
    //     const channel = JSON.parse(msg);
    //     this.channels.set(channel.id, channel);
    //   });

    this._socketIo.inputSwitched()
      .subscribe((msg: string) => {
        const data = JSON.parse(msg);
        this.channels.get(data.channelId).selectedInput = data.inputId;
        // input bar update
        if (this.selectedChannel === data.channelId.toString()) { // if the switch is on the currently selected channel
          document.getElementById('input' + this.selectedInput).classList.remove('selected');
          // cheking that the input exists and that the channel is the currently selected one
          if (this.inputs.get(data.inputId)) {
            this.selectedInput = data.inputId;
            document.getElementById('input' + this.selectedInput).classList.add('selected');
          }
        }
      });
  }

  ini() {


    // récupération des inputs
    // this._apiCallService.producersGetAll().subscribe(
    //   data => {
    //     this.result = data;
    //     this.result.forEach(element => {
    //       this.inputs.set(element[0], element[1]);
    //     });
    //   },
    //   err => console.log(err),
    //   () => console.log('done loading Caspars')
    // );

    // // récupération des outputs
    // this._apiCallService.getChannels().subscribe(
    //   data => {
    //     this.result = data;
    //     this.result.forEach(element => {
    //       this.channels.set(element[0], element[1]);
    //     });
    //   },
    //   err => console.log(err),
    //   () => console.log('done loading Caspars')
    // );

  }

  inputClick(event) {
    // document.getElementById('input' + this.selectedInput).classList.remove('selected');
    // // this.selectedInput = event.target.getAttribute('name');
    // // event.target.classList.add('selected');
    console.log(this.selectedChannel);
    console.log(event.target.getAttribute('name'));
    this._apiCallService.channelSwitch(this.selectedChannel, event.target.getAttribute('name')).subscribe(
      data => {
        console.log(data);
      },
      err => console.log(err),
      () => console.log('send channelSwitch')
    );
  }

  channelClick(event) {
    document.getElementById('channel' + this.selectedChannel).classList.remove('selected');
    this.selectedChannel = event.target.getAttribute('name');
    event.target.classList.add('selected');

    // input bar update
    const selectedInput = this.channels.get(parseInt(this.selectedChannel, 10)).selectedInput;
    if (document.getElementById('input' + this.selectedInput)) {
      document.getElementById('input' + this.selectedInput).classList.remove('selected');
    }
    if (this.inputs.get(selectedInput)) { // cheking that the input exists.
      this.selectedInput = selectedInput;
      document.getElementById('input' + this.selectedInput).classList.add('selected');
    }

  }

}
