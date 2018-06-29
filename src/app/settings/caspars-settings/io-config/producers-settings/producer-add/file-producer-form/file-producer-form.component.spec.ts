import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FileProducerFormComponent } from './file-producer-form.component';

describe('FileProducerFormComponent', () => {
  let component: FileProducerFormComponent;
  let fixture: ComponentFixture<FileProducerFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FileProducerFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FileProducerFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
