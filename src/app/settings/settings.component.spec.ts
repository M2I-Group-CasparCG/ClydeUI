import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsComponent } from './settings.component';
import { ApiSettingsComponent } from './api-settings/api-settings.component';
import { CasparsSettingsComponent} from './caspars-settings/caspars-settings.component';
import { IoConfigComponent } from './io-config/io-config.component';
import { FormsModule } from '@angular/forms';
import { CasparSelectComponent } from '../caspar-select/caspar-select.component';


import { ApiCallService } from '../api-call.service';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { SocketIoService } from '../socket-io.service';

describe('SettingsComponent', () => {
  let component: SettingsComponent;
  let fixture: ComponentFixture<SettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SettingsComponent,
        CasparSelectComponent, ApiSettingsComponent, CasparsSettingsComponent, IoConfigComponent
      ],
      imports : [
        FormsModule
      ],
      providers : [ ApiCallService, HttpClient, HttpHandler, SocketIoService  ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
