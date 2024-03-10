import { HttpClient } from '@angular/common/http';
import { Component, effect } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Standard, School, Gender, RecordStudent, StudentService, FieldsStudent, errorSuccess } from '../student.service';
import { CommonModule } from '@angular/common';
import { environment } from '../../../environments/environment';
import { FieldsFeeStructure } from '../../fee/fee.service';

@Component({
  selector: 'app-student-personal',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './student-personal.component.html',
  styleUrl: './student-personal.component.css'
})
export class StudentPersonalComponent {
  skipOnInit:boolean = false;
  standards!: Standard[];
  schools!: School[];
  genders!: Gender[];
  errorSuccess!: errorSuccess;
  editStudent:FormGroup;
  FeeStructureList:FieldsFeeStructure[] = [];

  constructor(private studentService:StudentService,private router:Router,private httpClient:HttpClient){
    if(this.studentService.selectedStudent().id == null || this.studentService.selectedStudent().id == ""){
      this.skipOnInit = true;
      this.router.navigate(['/student']);
    }

    this.FeeStructureList = this.studentService.FeeStructureList;

    console.log("EditStudentPersonalComponent C")

    this.editStudent = new FormGroup({
      id: new FormControl({ value: this.studentService.selectedStudent().id, disabled: true }),
      first_name: new FormControl(null,[Validators.required,Validators.pattern("[a-zA-Z]{3,20}")]),
      last_name: new FormControl(null,[Validators.required,Validators.pattern("[a-zA-Z]{3,20}")]),
      gender: new FormControl(this.studentService.genders[0].value,[Validators.required]),
      date_of_birth: new FormControl(null,[Validators.required]),
      standard: new FormControl(this.studentService.standards[1].value,[Validators.required]),
      parents_name: new FormControl(null,[Validators.required,Validators.pattern("[a-zA-Z]{3,20}")]),
      parents_mobile: new FormControl(null,[Validators.required,Validators.pattern("[+][0-9]{1,3}[0-9]{10}")]),
      school_name: new FormControl(this.studentService.schools[0].value,[Validators.required]),
      fee_structure: new FormControl(this.FeeStructureList[0].id,[Validators.required]),
      date_of_admission: new FormControl(null,[Validators.required]),
      comment: new FormControl(),
    });

    effect(() => {})
  }
  
  ngOnInit(): void {
    if(this.skipOnInit){
      return;
    }
    console.log("EditStudentPersonalComponent N")
    console.log(this.studentService.selectedStudent())
    this.editStudent.patchValue(this.studentService.selectedStudent());

    this.standards = this.studentService.standards.slice(1);
    this.schools = this.studentService.schools;
    this.genders = this.studentService.genders;
    this.errorSuccess = {
      isError : false,
      errorSuccessMessage : ""
    }
  }



  editStudentPersonal(){
    this.errorSuccess = {
      isError : false,
      errorSuccessMessage : ""
    }
    for (const key in this.editStudent.controls) {
      if (this.editStudent.controls[key].errors != null) {
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

    this.editStudent.controls["id"].enable();
    this.httpClient.put<FieldsStudent>(`${environment.apiUrl}/api/student`,this.editStudent.value).subscribe({
      next: (data:FieldsStudent) => {
        data.date_of_admission = (new Date(data.date_of_admission as string)).toISOString().split("T")[0];
        data.date_of_birth = (new Date(data.date_of_birth as string)).toISOString().split("T")[0];
        this.studentService.selectedStudent.set(data);
        this.editStudent.patchValue(data);
        this.errorSuccess = {
          isError: false,
          errorSuccessMessage: "Saved Successfully"
        }
        setTimeout(() => {
          this.errorSuccess = {
            isError: false,
            errorSuccessMessage: ""
          }
        }, 2000);
      },
      error: (error:any) => {
        console.log(error)
      },
      complete: () => {
        this.editStudent.controls["id"].disable();
      }
      
    })
    
  }

  resetForm(){
    this.editStudent.setValue(this.studentService.selectedStudent());
  }

  popupClose(){
    this.errorSuccess = {
      isError : false,
      errorSuccessMessage : ""
    }
  }

  validationMessages = {
    first_name: 'First name is required and must be at least 3 characters long. valid char are a-z,A-Z',
    last_name: 'Last name is required and must be at least 3 characters long. valid char are a-z,A-Z',
    gender: 'Gender is required.',
    date_of_birth: 'Date of birth is required.',
    standard:  'Standard is required.',
    parents_name: 'Parents name is required and must be at least 3 characters long.',
    parents_mobile: 'Parents mobile number is required. & Please enter a valid mobile number.',
    fee_structure: 'Fee structure is required.'
    }
}
