import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LivePageComponent } from './live-page.component';
import { OutputMatrixComponent } from '../output-matrix/output-matrix.component';
import { MediaPlayerComponent } from '../media-player/media-player.component';
import { SwitchBar2dComponent } from '../switch-bar-2d/switch-bar-2d.component';
import { CasparSelectComponent } from '../caspar-select/caspar-select.component';
import { FormsModule } from '@angular/forms';
import { ApiCallService } from '../api-call.service';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { SocketIoService } from '../socket-io.service';


describe('LivePageComponent', () => {
  let component: LivePageComponent;
  let fixture: ComponentFixture<LivePageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule ],
      declarations: [
        LivePageComponent,
        OutputMatrixComponent,
        MediaPlayerComponent,
        SwitchBar2dComponent,
        CasparSelectComponent ],
      providers : [
        ApiCallService, HttpClient, HttpHandler, SocketIoService
      ]
    })
    .compileComponents();
  }));

  // beforeEach(() => {
  //   fixture = TestBed.createComponent(LivePageComponent);
  //   component = fixture.componentInstance;
  //   fixture.detectChanges();
  // });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
 });
