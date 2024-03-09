import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { FieldsStudent, StudentService } from '../student.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-student-manage',
  standalone: true,
  imports: [RouterOutlet,CommonModule],
  templateUrl: './student-manage.component.html',
  styleUrl: './student-manage.component.css'
})
export class StudentManageComponent {
  skipOnInit:boolean = false;
  selectedStudent!: FieldsStudent;
  isActiveTab:string = 'personal';

  constructor(private studentService:StudentService,private router:Router){
    this.selectedStudent = this.studentService.selectedStudent();
    if(this.selectedStudent.id == null || this.selectedStudent.id == ""){
      this.skipOnInit = true;
      this.router.navigate(['/student']);
    }
  }

  changeTab(tab:string){
    this.isActiveTab = tab;
    this.router.navigate(['/student/manage/'+tab]);
  }

}
