import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SwitchBar2dComponent } from './switch-bar-2d.component';
import { FormsModule } from '@angular/forms';
import { CasparSelectComponent } from '../caspar-select/caspar-select.component';


import { ApiCallService } from '../api-call.service';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { SocketIoService } from '../socket-io.service';

describe('SwitchBar2dComponent', () => {
  let component: SwitchBar2dComponent;
  let fixture: ComponentFixture<SwitchBar2dComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SwitchBar2dComponent, CasparSelectComponent],
      imports: [FormsModule],
      providers : [ ApiCallService, HttpClient, HttpHandler, SocketIoService  ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SwitchBar2dComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
