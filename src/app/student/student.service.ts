import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { environment } from '../../environments/environment';
import { FeeStructure } from '../fee/fee.service';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  standards:Standard[] = [
    {name:"# All",value:"all"},
    {name:"# Nursery",value:"nursery"},
    {name:"# Play",value:"play"},
    {name:"# Junior",value:"junior"},
    {name:"# Senior",value:"senior"},
    {name:"# 1",value:"1"},
    {name:"# 2",value:"2"},
    {name:"# 3",value:"3"},
    {name:"# 4",value:"4"},
    {name:"# 5",value:"5"},
    {name:"# 6",value:"6"},
    {name:"# 7",value:"7"},
    {name:"# 8",value:"8"},
    {name:"# 9",value:"9"},
    {name:"# 10",value:"10"},
    {name:"# 11",value:"11"},
    {name:"# 12",value:"12"},
  ];
  genders:Gender[] = [
    {name:"Male",value:"male"},
    {name:"Female",value:"female"},
    {name:"Other",value:"other"}
  ];
  schools:School[] = [
    {name:"I. P. Savani High School, Surat",value:"ip-savani-high-school-surat"}
  ];
  selectedStudent = signal<Student>({} as Student);
  selectedStandard = signal<Standard>(this.standards[0]);
  FeeStructureList:FeeStructure[] = [];

  constructor(private http:HttpClient) { 
    this.selectedStandard.set(this.standards[0]);
    console.log("student service call")
    this.http.get<FeeStructure[]>(`${environment.apiUrl}/api/FeeStructure`).subscribe({
      next:(nxt) => {
        this.FeeStructureList = nxt;
      },
      error:(err) => {
        console.log(err);
      },
      complete:() => {
        console.log("completed");
      }
    })
  }
}
export interface Student {
  last_name: string;
  first_name: string;
  standard: string;
  parents_name: string;
  parents_mobile: string;
  comment: string;
  id: string;
  gender: string;
  date_of_birth: string;
  school_name: string;
  date_of_admission: string;
  fee_structure_id: string;
}

export interface Standard{
  name: string;
  value:string;
}
export interface Gender{
  name: string;
  value:string;
}
export interface School{
  name: string;
  value:string;
}

export interface errorSuccess{
  errorSuccessMessage: string;
  isError:boolean;
}