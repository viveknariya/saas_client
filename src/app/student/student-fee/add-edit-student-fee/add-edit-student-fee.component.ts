import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Fee, FeeService, NameValue } from '../../../fee/fee.service';
import { StudentService, errorSuccess } from '../../student.service';
import { environment } from '../../../../environments/environment';
import { CommonModule } from '@angular/common';
import { ErrorSuccessComponent } from '../../../error-success/error-success.component';

@Component({
  selector: 'app-add-edit-student-fee',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule,ErrorSuccessComponent],
  templateUrl: './add-edit-student-fee.component.html',
  styleUrl: './add-edit-student-fee.component.css'
})
export class AddEditStudentFeeComponent {
  errorSuccess!: errorSuccess;
  addEditFee!: FormGroup;
  modeOfTransections:NameValue[];
  typeOfFee!: NameValue[];
  typeOfTransection!: NameValue[];

  resetForm(){
      this.addEditFee.setValue(this.feeService.selectedStudentFee());
  }

  constructor(private feeService:FeeService,private router:Router,private httpClient:HttpClient,private studentService:StudentService){
    this.errorSuccess = {
      isError: false,
      errorSuccessMessage: "",
    
    }
    this.modeOfTransections = this.feeService.modeOfTransections;
    this.typeOfFee = this.feeService.TypeOfFee;
    this.typeOfTransection = this.feeService.TypeOfTransection;


    this.addEditFee = new FormGroup({
      id:new FormControl({value:this.feeService.selectedStudentFee().id,disabled:true}),
      student_id:new FormControl({value:this.studentService.selectedStudent().id,disabled:true}),
      date_of_transection:new FormControl(this.formatDate(new Date),[Validators.required]),
      amount: new FormControl(null,[Validators.required,Validators.pattern("[0-9]+")]),
      is_credit:new FormControl(this.typeOfTransection[0].value,[Validators.required]),
      type_of_fee:new FormControl(this.typeOfFee[0].value,[Validators.required]),
      mode_of_transection : new FormControl(this.modeOfTransections[0].value,[Validators.required]),
      comment:new FormControl(),
    })
    
  }

  
  addEditStudentFee(){
    this.errorSuccess = {
      isError : false,
      errorSuccessMessage : ""  
    }
    for (const key in this.addEditFee.controls) {
      if (this.addEditFee.controls[key].errors != null) {
        this.errorSuccess = {
          isError: true,
          errorSuccessMessage: (<any>this.validationMessages)[key]
        };
        break; // Exit the loop once an error is found
      }
    }
    if(this.errorSuccess.isError){
      return;
    }

      this.addEditFee.controls["student_id"].enable();
      this.httpClient.post<Fee>(`${environment.apiUrl}/api/FeeTransection`,this.addEditFee.value).subscribe({
        next: (data:Fee) => {
          this.resetForm();
          this.errorSuccess = {
            isError: false,
            errorSuccessMessage: "Fee Added Successfully",
          } 
          setTimeout(() => {
            this.errorSuccess = {
              isError: false,
              errorSuccessMessage: "",
            }
          }, 2000);
        },
        error: (error:any) => {
          console.log(error)
        },
        complete: () => {
          this.addEditFee.controls["student_id"].disable();
        }
      })
    
    

  }

  formatDate(date: Date): string {
    // Format the date to 'YYYY-MM-DD' as required by the input type="date"
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  validationMessages = {
    date_of_transection: 'Date of transaction must be date.',
    amount: 'Amount must be positive number.',
    is_credit: 'Type of transaction is required.',
    type_of_fee: 'Type of Fee is required.',
    mode_of_transection:  'Mode Of transaction is required.',
    comment: 'Comment is required',
    student_id: 'Student ID is required - Plz contact support team!',
    }

}
