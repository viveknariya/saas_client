import { Component, OnInit, effect } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FieldsStudent, Gender, RecordStudent, School, Standard, StudentService, errorSuccess } from '../student.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { FieldsFeeStructure } from '../../fee/fee.service';

@Component({
  selector: 'app-add-student',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule,HttpClientModule],
  templateUrl: './add-student.component.html',
  styles:[`
    input, select, textarea{
    font-size: 0.75rem/* 12px */;
    line-height: 1rem/* 16px */;
  }
  `]
})
export class AddStudentComponent implements OnInit {
  standards!: Standard[];
  schools!: School[];
  genders!: Gender[];
  errorSuccess!: errorSuccess;

  addStudent:FormGroup;
  FeeStructureList:FieldsFeeStructure[] = [];

  constructor(private studentService:StudentService,private router:Router,private httpClient:HttpClient){
    this.FeeStructureList = this.studentService.FeeStructureList;
    
    this.addStudent = new FormGroup({
      id: new FormControl({ value: null, disabled: true }),
      first_name: new FormControl(null,[Validators.required,Validators.pattern("[a-zA-Z]{3,20}")]),
      last_name: new FormControl(null,[Validators.required,Validators.pattern("[a-zA-Z]{3,20}")]),
      gender: new FormControl(this.studentService.genders[0].value,[Validators.required]),
      date_of_birth: new FormControl(null,[Validators.required]),
      standard: new FormControl(this.studentService.standards[1].value,[Validators.required]),
      parents_name: new FormControl(null,[Validators.required,Validators.pattern("[a-zA-Z]{3,20}")]),
      parents_mobile: new FormControl(null,[Validators.required,Validators.pattern("[+][0-9]{1,3}[0-9]{10}")]),
      school_name: new FormControl(this.studentService.schools[0].value,[Validators.required]),
      fee_structure_id: new FormControl(this.studentService.FeeStructureList[0].id,[Validators.required]),
      date_of_admission: new FormControl(null,[Validators.required]),
      comment: new FormControl(),
    });

    effect(() => {})
  }
  
  ngOnInit(): void {
    this.errorSuccess = {
      isError : false,
      errorSuccessMessage : ""  
    }
    this.standards = this.studentService.standards.slice(1);
    this.schools = this.studentService.schools;
    this.genders = this.studentService.genders;
  }

  backToStandard(){
    this.router.navigate(['/student']);
  }

  addStudentPersonal(){

    for (const key in this.addStudent.controls) {
      if (this.addStudent.controls[key].errors != null) {
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
    
    this.httpClient.post<FieldsStudent>(`${environment.apiUrl}/api/student`,this.addStudent.value).subscribe({
      next: (data:FieldsStudent) => {
        this.resetForm();
        this.errorSuccess = {
          isError : false,
          errorSuccessMessage : "Student added successfully"
        }
      },
      error: (error:any) => {
        console.log(error)
      },
      complete: () => {}
    })
  }

  resetForm(){
    this.addStudent.setValue({
      id: null,
      first_name: null,
      last_name: null,
      gender: this.studentService.genders[0].value,
      date_of_birth: null,
      standard: this.studentService.standards[1].value,
      parents_name: null,
      parents_mobile: null,
      school_name: this.studentService.schools[0].value,
      date_of_admission: null,
      fee_structure_id:this.studentService.FeeStructureList[0].id,
      comment: null,
    })
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
  };
  

