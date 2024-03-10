import { Component, OnInit } from '@angular/core';
import { FieldsFee } from '../../fee/fee.service';
import { HttpClient } from '@angular/common/http';
import { FieldsStudent, RecordStudent, StudentService } from '../student.service';
import { Router } from '@angular/router';
import { StudentFeeService } from './student-fee.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-student-fee',
  standalone: true,
  imports: [],
  templateUrl: './student-fee.component.html'
})
export class StudentFeeComponent implements OnInit {

  skipOnInit:boolean = false;
  actionMessage!: string;
  store:FieldsFee[] =[];
  data:FieldsFee[] = [];
  selectedStudent!: FieldsStudent;

  constructor(private studentFeeService:StudentFeeService,private studentService:StudentService,private router:Router,private httpClient:HttpClient) {
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

    this.httpClient.get<FieldsFee[]>(`${environment.apiUrl}/api/FeeTransection`).subscribe({
      next: (nxt:FieldsFee[]) => {
        this.store = nxt;
        
        this.data = this.store.filter((fee:FieldsFee) => {
          if(fee.student_id == this.selectedStudent.id){
            return true;
          }
          else{
            return false;
          }
        })
      }
    })
  }

  addStudentFee(){
    this.studentFeeService.selectedStudentFeeAddMode.set(true);
    this.router.navigate(["/student/manage/addEditFee"])
  }

  editStudentFee(item:FieldsFee){
    item.date_of_transection = new Date(item.date_of_transection as string).toISOString().split('T')[0];
    this.studentFeeService.selectedStudentFee.set(item);
    this.studentFeeService.selectedStudentFeeAddMode.set(false);
    this.router.navigate(["/student/manage/addEditFee"])
  }

  deleteStudentFee(item:FieldsFee){
    this.httpClient.delete<any>(`https://api.airtable.com/v0/${item.id}`).subscribe({
      next: (data:any) => {
        console.log(data);
        this.actionMessage = "Deleted Successfully"
      },
      error: (error:any) => {
        console.log(error)
      },
      complete: () => {}
    })
  }


}
