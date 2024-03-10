import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ModeOfTransections, StudentFeeService } from '../student-fee.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FieldsFee } from '../../../fee/fee.service';
import { StudentService } from '../../student.service';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-add-edit-student-fee',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './add-edit-student-fee.component.html',
  styleUrl: './add-edit-student-fee.component.css'
})
export class AddEditStudentFeeComponent {
  isAddMode!: boolean;
  actionMessage!: string;
  addEditFee!: FormGroup;
  modeOfTransections:ModeOfTransections[];
  backToFee(){
    this.router.navigate(['/student/manage/fee'])
  }
  addEditStudentFee(){
    if(this.isAddMode){
      this.httpClient.post<FieldsFee>(`${environment.apiUrl}/api/FeeTransection`,this.addEditFee.value).subscribe({
        next: (data:FieldsFee) => {
          console.log(data);
          this.addEditFee.patchValue(data);
          this.actionMessage = "Added Successfully"
          setTimeout(() => {
            this.actionMessage = "";
          }, 2000);
        },
        error: (error:any) => {
          console.log(error)
        },
        complete: () => {}
      })
    }
    else{
      this.addEditFee.controls["id"].enable();
      this.addEditFee.controls["student_id"].enable();
      this.httpClient.put<FieldsFee>(`${environment.apiUrl}/api/FeeTransection`,this.addEditFee.value).subscribe({
        next: (data:FieldsFee) => {
          console.log(data);
          this.addEditFee.patchValue(data);
          this.actionMessage = "Edited Successfully"
          setTimeout(() => {
            this.actionMessage = "";
          }, 2000);
        },
        error: (error:any) => {
          console.log(error)
        },
        complete: () => {
          this.addEditFee.controls["id"].disable();
          this.addEditFee.controls["student_id"].disable();

        }
      })
    }

  }
  resetForm(){
    this.addEditFee.setValue(this.studentFeeService.selectedStudentFee());
  }

  constructor(private studentFeeService:StudentFeeService,private router:Router,private httpClient:HttpClient,private studentService:StudentService){
    this.actionMessage = "";
    this.modeOfTransections = this.studentFeeService.modeOfTransections;
    this.isAddMode = this.studentFeeService.selectedStudentFeeAddMode();
    this.addEditFee = new FormGroup({
      id:new FormControl({value:this.studentFeeService.selectedStudentFee().id,disabled:true}),
      amount: new FormControl(),
      mode_of_transection : new FormControl(this.modeOfTransections[0].value),
      comment:new FormControl(),
      date_of_transection:new FormControl(this.formatDate(new Date)),
      student_id:new FormControl({value:this.studentService.selectedStudent().id,disabled:true}),
    })
    if(!this.isAddMode){
      this.addEditFee.patchValue(this.studentFeeService.selectedStudentFee());
    }
  }

  formatDate(date: Date): string {
    // Format the date to 'YYYY-MM-DD' as required by the input type="date"
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  popupClose(){
    this.actionMessage = "";
  }
}
