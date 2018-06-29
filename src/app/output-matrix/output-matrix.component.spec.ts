import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OutputMatrixComponent } from './output-matrix.component';

describe('OutputMatrixComponent', () => {
  let component: OutputMatrixComponent;
  let fixture: ComponentFixture<OutputMatrixComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OutputMatrixComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OutputMatrixComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
