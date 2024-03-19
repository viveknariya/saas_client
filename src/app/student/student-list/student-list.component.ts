import { Component, effect } from '@angular/core';
import { FieldsStudent, RecordStudent, Standard, StudentService } from '../student.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-student-list',
  standalone: true,
  imports: [HttpClientModule,ReactiveFormsModule],
  templateUrl: './student-list.component.html',
  styleUrl: './student-list.component.css'
})
export class StudentListComponent {
  store:FieldsStudent[] =[];
  data:FieldsStudent[] = [];
  searchStudent:FormControl;
  selectedStudent!: RecordStudent;
  standard:FormControl;

  Standards:Standard[]=[];
  activeStandard!: Standard;
 
  constructor(private httpClient:HttpClient,private router:Router,private studentService:StudentService){

    this.searchStudent = new FormControl();

    this.Standards = this.studentService.standards;
    effect(() => {
      this.activeStandard = this.studentService.selectedStandard();
    })

    this.standard = new FormControl(this.Standards[0].value);
  }

  ngOnInit(): void {

    this.searchStudent.valueChanges.subscribe({
      next: (val) => {
        console.log(val);
        this.data = this.store.filter((student:FieldsStudent) => {
          if((student.first_name.toLowerCase().includes(val.toLowerCase()) || student.last_name.toLowerCase().includes(val.toLowerCase())) && (student.standard == this.studentService.selectedStandard().value || this.studentService.selectedStandard().value == "all")){
              return true;
          }
          return false;
        })
      }
    })

    this.standard.valueChanges.subscribe({
      next: (val) => {
        if(val == "all"){
          this.data = this.store;
          return;
        }
        this.data = this.store.filter((student:FieldsStudent) => {
          if(student.standard == val){
            return true;
          }
          return false;
        })
      }
    })

    this.httpClient.get<FieldsStudent[]>(`${environment.apiUrl}/api/student`).subscribe({
      next: (data:FieldsStudent[]) => {
        this.store = data as FieldsStudent[];
        this.data = data as FieldsStudent[];

        const val = this.studentService.selectedStandard();
          if(val.value == "all"){
            this.data = this.store;
            return;
          }
        this.data = this.store.filter((student:FieldsStudent) => {
          if(student.standard == val.value){
            return true;
          }
          return false;
        })
      },
      error: (err) => {
      
      }
      ,complete: () => {
      }
    })
  }

  addStudent(){
    this.router.navigate(['/student/addStudent'])
  }

  manageStudent(item:FieldsStudent){
    item.date_of_admission = (new Date(item.date_of_admission as string)).toISOString().split("T")[0];
    item.date_of_birth = (new Date(item.date_of_birth as string)).toISOString().split("T")[0];
    this.studentService.selectedStudent.set(item);
    this.router.navigate(['/student/manage']);
  }
}
