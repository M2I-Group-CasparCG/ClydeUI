import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OutputMatrixComponent } from './output-matrix.component';
import { FormsModule } from '@angular/forms';
import { ApiCallService } from '../api-call.service';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { SocketIoService } from '../socket-io.service';
import { CasparSelectComponent } from '../caspar-select/caspar-select.component';


describe('OutputMatrixComponent', () => {
  let component: OutputMatrixComponent;
  let fixture: ComponentFixture<OutputMatrixComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OutputMatrixComponent
      , CasparSelectComponent],
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
    fixture = TestBed.createComponent(OutputMatrixComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
