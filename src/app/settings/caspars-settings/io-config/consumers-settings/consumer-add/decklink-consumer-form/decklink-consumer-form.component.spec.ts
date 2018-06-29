import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DecklinkConsumerFormComponent } from './decklink-consumer-form.component';

describe('DecklinkConsumerFormComponent', () => {
  let component: DecklinkConsumerFormComponent;
  let fixture: ComponentFixture<DecklinkConsumerFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DecklinkConsumerFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DecklinkConsumerFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
