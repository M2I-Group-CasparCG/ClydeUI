import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CasparSelectComponent } from './caspar-select.component';
import { ApiCallService } from '../api-call.service';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { SocketIoService } from '../socket-io.service';


class Event {
  target: Object;
}

describe('CasparSelectComponent', () => {
  let component: CasparSelectComponent;
  let fixture: ComponentFixture<CasparSelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule],
      declarations: [ CasparSelectComponent ],
      providers : [ ApiCallService, HttpClient, HttpHandler, SocketIoService  ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CasparSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    const event = new Event();
        event.target = {value : 1000 };
        component.selectSubmit(event);
    expect(component.selectedCasparId).toBe(1000);
  });

    it('should create', () => {
    expect(component).toBeTruthy();
  });
 });
