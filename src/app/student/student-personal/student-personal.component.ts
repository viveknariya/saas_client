import { HttpClient } from '@angular/common/http';
import { Component, effect } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Standard, School, Gender, RecordStudent, StudentService, FieldsStudent } from '../student.service';
import { CommonModule } from '@angular/common';
import { BackendConstant } from '../../backend';

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
  actionMessage!: string;
  editStudent:FormGroup;

  constructor(private studentService:StudentService,private router:Router,private httpClient:HttpClient){
    if(this.studentService.selectedStudent().id == null || this.studentService.selectedStudent().id == ""){
      this.skipOnInit = true;
      this.router.navigate(['/student']);
    }

    console.log("EditStudentPersonalComponent C")

    this.editStudent = new FormGroup({
      id: new FormControl({ value: this.studentService.selectedStudent().id, disabled: true }),
      first_name: new FormControl(),
      last_name: new FormControl(),
      gender: new FormControl(this.studentService.genders[0].value),
      date_of_birth: new FormControl(),
      standard: new FormControl(this.studentService.standards[1].value),
      parents_name: new FormControl(),
      parents_mobile: new FormControl(),
      school_name: new FormControl(this.studentService.schools[0].value),
      date_of_admission: new FormControl(),
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
    this.actionMessage = "";
  }



  editStudentPersonal(){
    this.editStudent.controls["id"].enable();
    this.httpClient.put<FieldsStudent>(`${BackendConstant.BASE_URL}/api/student`,this.editStudent.value).subscribe({
      next: (data:FieldsStudent) => {
        data.date_of_admission = (new Date(data.date_of_admission as string)).toISOString().split("T")[0];
        data.date_of_birth = (new Date(data.date_of_birth as string)).toISOString().split("T")[0];
        this.studentService.selectedStudent.set(data);
        this.editStudent.patchValue(data);
        this.actionMessage = "Saved Successfully";
        setTimeout(() => {
          this.actionMessage = "";
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
    this.actionMessage = "";
  }
}
