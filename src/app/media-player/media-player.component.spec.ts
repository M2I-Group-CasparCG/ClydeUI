import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MediaPlayerComponent } from './media-player.component';
import { FormsModule } from '@angular/forms';
import { ApiCallService } from '../api-call.service';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { SocketIoService } from '../socket-io.service';
import { CasparSelectComponent } from '../caspar-select/caspar-select.component';

describe('MediaPlayerComponent', () => {
  let component: MediaPlayerComponent;
  let fixture: ComponentFixture<MediaPlayerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MediaPlayerComponent, CasparSelectComponent ],
      imports: [
        FormsModule
      ],
      providers: [
        ApiCallService, HttpClient, HttpHandler, SocketIoService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MediaPlayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
 });
