import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SwitchBarButtonComponent } from './switch-bar-button.component';

describe('SwitchBarButtonComponent', () => {
  let component: SwitchBarButtonComponent;
  let fixture: ComponentFixture<SwitchBarButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SwitchBarButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SwitchBarButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
