import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsumersSettingsComponent } from './consumers-settings.component';

describe('ConsumersSettingsComponent', () => {
  let component: ConsumersSettingsComponent;
  let fixture: ComponentFixture<ConsumersSettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsumersSettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsumersSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
