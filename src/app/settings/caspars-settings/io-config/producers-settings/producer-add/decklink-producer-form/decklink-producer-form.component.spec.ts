import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DecklinkProducerFormComponent } from './decklink-producer-form.component';

describe('DecklinkProducerFormComponent', () => {
  let component: DecklinkProducerFormComponent;
  let fixture: ComponentFixture<DecklinkProducerFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DecklinkProducerFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DecklinkProducerFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
