import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CasparSelectComponent } from './caspar-select.component';
import { ApiCallService } from '../api-call.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

describe('CasparSelectComponent', () => {
  let component: CasparSelectComponent;
  let fixture: ComponentFixture<CasparSelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CasparSelectComponent ],
      providers : [ ApiCallService, HttpClient,  ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CasparSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
