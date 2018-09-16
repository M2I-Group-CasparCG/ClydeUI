import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HyperdecksSettingsComponent } from './hyperdecks-settings.component';

describe('HyperdecksSettingsComponent', () => {
  let component: HyperdecksSettingsComponent;
  let fixture: ComponentFixture<HyperdecksSettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HyperdecksSettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HyperdecksSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
