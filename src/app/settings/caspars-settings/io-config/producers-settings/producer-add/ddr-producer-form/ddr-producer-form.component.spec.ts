import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DdrProducerFormComponent } from './ddr-producer-form.component';

describe('DdrProducerFormComponent', () => {
  let component: DdrProducerFormComponent;
  let fixture: ComponentFixture<DdrProducerFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DdrProducerFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DdrProducerFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
