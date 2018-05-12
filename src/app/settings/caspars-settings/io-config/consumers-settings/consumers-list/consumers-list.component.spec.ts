import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsumersListComponent } from './consumers-list.component';

describe('ConsumersListComponent', () => {
  let component: ConsumersListComponent;
  let fixture: ComponentFixture<ConsumersListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsumersListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsumersListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
