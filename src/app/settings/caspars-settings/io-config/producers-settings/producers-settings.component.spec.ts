import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProducersSettingsComponent } from './producers-settings.component';

describe('ProducersSettingsComponent', () => {
  let component: ProducersSettingsComponent;
  let fixture: ComponentFixture<ProducersSettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProducersSettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProducersSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
