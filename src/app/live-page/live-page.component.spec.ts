import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LivePageComponent } from './live-page.component';

describe('LivePageComponent', () => {
  let component: LivePageComponent;
  let fixture: ComponentFixture<LivePageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LivePageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LivePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
