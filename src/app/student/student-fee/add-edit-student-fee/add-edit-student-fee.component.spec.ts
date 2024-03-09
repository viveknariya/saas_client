import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditStudentFeeComponent } from './add-edit-student-fee.component';

describe('AddEditStudentFeeComponent', () => {
  let component: AddEditStudentFeeComponent;
  let fixture: ComponentFixture<AddEditStudentFeeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddEditStudentFeeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddEditStudentFeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
