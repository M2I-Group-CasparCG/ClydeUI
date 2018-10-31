import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SwitchBarComponent } from './switch-bar.component';

describe('SwitchBarComponent', () => {
  let component: SwitchBarComponent;
  let fixture: ComponentFixture<SwitchBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SwitchBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SwitchBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
