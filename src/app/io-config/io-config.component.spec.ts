import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IoConfigComponent } from './io-config.component';

describe('IoConfigComponent', () => {
  let component: IoConfigComponent;
  let fixture: ComponentFixture<IoConfigComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IoConfigComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IoConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
