import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CasparsSettingsComponent } from './caspars-settings.component';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ApiCallService } from '../../api-call.service';
import { SocketIoService } from '../../socket-io.service';

describe('CasparsSettingsComponent', () => {
  let component: CasparsSettingsComponent;
  let fixture: ComponentFixture<CasparsSettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CasparsSettingsComponent ],
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
    fixture = TestBed.createComponent(CasparsSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
 });
