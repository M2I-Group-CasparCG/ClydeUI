import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CasparAddComponent } from './caspar-add.component';

describe('CasparAddComponent', () => {
  let component: CasparAddComponent;
  let fixture: ComponentFixture<CasparAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CasparAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CasparAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
