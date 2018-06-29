import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StreamConsumerFormComponent } from './stream-consumer-form.component';

describe('StreamConsumerFormComponent', () => {
  let component: StreamConsumerFormComponent;
  let fixture: ComponentFixture<StreamConsumerFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StreamConsumerFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StreamConsumerFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
