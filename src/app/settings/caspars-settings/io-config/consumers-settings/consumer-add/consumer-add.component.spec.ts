import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsumerAddComponent } from './consumer-add.component';

describe('ConsumerAddComponent', () => {
  let component: ConsumerAddComponent;
  let fixture: ComponentFixture<ConsumerAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsumerAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsumerAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
