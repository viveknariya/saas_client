import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentManageComponent } from './student-manage.component';

describe('StudentManageComponent', () => {
  let component: StudentManageComponent;
  let fixture: ComponentFixture<StudentManageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudentManageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StudentManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
