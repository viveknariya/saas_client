import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Student, StudentService } from '../student.service';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { DateWithoutTPipe } from "../../date-without-t.pipe";
import { FeeTransection } from '../../fee/fee.service';

@Component({
    selector: 'app-student-fee',
    standalone: true,
    templateUrl: './student-fee.component.html',
    imports: [DateWithoutTPipe]
})
export class StudentFeeComponent implements OnInit {

  skipOnInit:boolean = false;
  store:FeeTransection[] =[];
  selectedStudent!: Student;

  constructor(private studentService:StudentService,private router:Router,private httpClient:HttpClient) {
    this.selectedStudent = this.studentService.selectedStudent();
    if(this.selectedStudent.id == null || this.selectedStudent.id == ""){
      this.skipOnInit = true;
      this.router.navigate(['/student']);
    }
  }
  ngOnInit(): void {
    if(this.skipOnInit){
      return;
    }
    this.selectedStudent = this.studentService.selectedStudent();

    this.httpClient.get<FeeTransection[]>(`${environment.apiUrl}/api/FeeTransection/student/${this.selectedStudent.id}`).subscribe({
      next: (nxt:FeeTransection[]) => {
        this.store = nxt;
      }
    })
  }

  addStudentFee(){
    this.router.navigate(["/student/manage/addEditFee"])
  }
}
