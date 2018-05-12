import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProducersListComponent } from './producers-list.component';

describe('ProducersListComponent', () => {
  let component: ProducersListComponent;
  let fixture: ComponentFixture<ProducersListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProducersListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProducersListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
