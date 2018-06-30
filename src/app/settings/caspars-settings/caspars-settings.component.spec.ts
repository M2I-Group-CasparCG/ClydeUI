import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CasparsSettingsComponent } from './caspars-settings.component';

describe('CasparsSettingsComponent', () => {
  let component: CasparsSettingsComponent;
  let fixture: ComponentFixture<CasparsSettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CasparsSettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CasparsSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
