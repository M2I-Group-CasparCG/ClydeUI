import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IoConfigComponent } from './io-config.component';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ApiCallService } from '../../api-call.service';
import { SocketIoService } from '../../socket-io.service';
import { CasparSelectComponent } from '../../caspar-select/caspar-select.component';

describe('IoConfigComponent', () => {
  let component: IoConfigComponent;
  let fixture: ComponentFixture<IoConfigComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IoConfigComponent, CasparSelectComponent ],
      imports : [
        FormsModule
      ],
      providers: [
        ApiCallService, HttpClient, HttpHandler, SocketIoService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IoConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
