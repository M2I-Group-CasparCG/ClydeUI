import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SwitchBar2dComponent } from './switch-bar-2d.component';

describe('SwitchBar2dComponent', () => {
  let component: SwitchBar2dComponent;
  let fixture: ComponentFixture<SwitchBar2dComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SwitchBar2dComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SwitchBar2dComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
