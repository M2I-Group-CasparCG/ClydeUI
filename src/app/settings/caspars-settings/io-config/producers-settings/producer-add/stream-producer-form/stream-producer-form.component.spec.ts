import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StreamProducerFormComponent } from './stream-producer-form.component';

describe('StreamProducerFormComponent', () => {
  let component: StreamProducerFormComponent;
  let fixture: ComponentFixture<StreamProducerFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StreamProducerFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StreamProducerFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
