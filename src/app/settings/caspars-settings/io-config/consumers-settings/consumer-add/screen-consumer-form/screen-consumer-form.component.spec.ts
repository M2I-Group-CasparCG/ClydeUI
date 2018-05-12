import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScreenConsumerFormComponent } from './screen-consumer-form.component';

describe('ScreenConsumerComponent', () => {
  let component: ScreenConsumerFormComponent;
  let fixture: ComponentFixture<ScreenConsumerFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScreenConsumerFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScreenConsumerFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
