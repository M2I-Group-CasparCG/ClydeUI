import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FileConsumerFormComponent } from './file-consumer-form.component';

describe('FileConsumerFormComponent', () => {
  let component: FileConsumerFormComponent;
  let fixture: ComponentFixture<FileConsumerFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FileConsumerFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FileConsumerFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
