import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentPersonalComponent } from './student-personal.component';

describe('StudentPersonalComponent', () => {
  let component: StudentPersonalComponent;
  let fixture: ComponentFixture<StudentPersonalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudentPersonalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StudentPersonalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
