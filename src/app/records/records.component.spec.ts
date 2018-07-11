import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecordsComponent } from './records.component';
import { ApiCallService } from '../api-call.service';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { SocketIoService } from '../socket-io.service';
import { CasparSelectComponent } from '../caspar-select/caspar-select.component';
import { FormsModule } from '@angular/forms';

describe('RecordsComponent', () => {
  let component: RecordsComponent;
  let fixture: ComponentFixture<RecordsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecordsComponent, CasparSelectComponent ],
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
    fixture = TestBed.createComponent(RecordsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
 });
