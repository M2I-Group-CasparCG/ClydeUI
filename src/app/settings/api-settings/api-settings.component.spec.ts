import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApiSettingsComponent } from './api-settings.component';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ApiCallService } from '../../api-call.service';
import { SocketIoService } from '../../socket-io.service';
describe('ApiSettingsComponent', () => {
  let component: ApiSettingsComponent;
  let fixture: ComponentFixture<ApiSettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApiSettingsComponent ],
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
    fixture = TestBed.createComponent(ApiSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
