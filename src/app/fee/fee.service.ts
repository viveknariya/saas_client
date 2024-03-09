import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FeeService {

  Period:Period[] = [
    {name:'Monthly',value:'month'},
    {name:'Yearly',value:'year'},
  ] 
  constructor() { }
  selectedFeeStructure = signal<FieldsFeeStructure>({} as FieldsFeeStructure);
  selectedFeeStructureFormMode = signal<boolean>(true);
}
export interface FieldsFee {
  amount: number;
  student_id: string;
  id: number;
  mode_of_transection?: string;
  date_of_transection: string;
  comment:string;
}
export interface FieldsFeeStructure {
  id: string;
  structure_name: string;
  amount: number;
  period: string;
  offset: string;
  comment: string;
}

export interface Period{
  name:string;
  value:string;
}
