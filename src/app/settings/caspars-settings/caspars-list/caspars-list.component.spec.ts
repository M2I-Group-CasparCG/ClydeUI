import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CasparsListComponent } from './caspars-list.component';

describe('CasparsListComponent', () => {
  let component: CasparsListComponent;
  let fixture: ComponentFixture<CasparsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CasparsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CasparsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
