import { Component, OnInit, ViewChild, ViewContainerRef, ComponentFactoryResolver } from '@angular/core';
import { ApiCallService } from '../api-call.service';
import { SocketIoService } from '../socket-io.service';
import { forEach } from '@angular/router/src/utils/collection';
import { SwitchBar2dComponent } from '../switch-bar-2d/switch-bar-2d.component';
import { CasparSelectComponent } from '../caspar-select/caspar-select.component';


@Component({
  selector: 'clydeui-io-config',
  templateUrl: './io-config.component.html',
  styleUrls: ['./io-config.component.less']
})

export class IoConfigComponent implements OnInit {

  public selectedCasparId = null;

  @ViewChild('vc', {read: ViewContainerRef}) vc: ViewContainerRef;

  constructor( private _apiCallService: ApiCallService,
               private _socketIo: SocketIoService,
               private componentFactoryResolver: ComponentFactoryResolver) {
  }

  ngOnInit() {

  }

  updateSelectedCasparId(id) {
    console.log('update ' + id );
    this.selectedCasparId = id;
  }

  producerTypeSelect(event) {
    // does not work.
    const type = event.target.value;
    console.log(this.selectedCasparId + ' ' + type);

    const factory = this.componentFactoryResolver.resolveComponentFactory(CasparSelectComponent);
    console.log('coucou');

    this.vc.createComponent(factory);


  }


}
