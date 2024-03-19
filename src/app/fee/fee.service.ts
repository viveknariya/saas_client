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

export interface FieldFeeTransection {
  id: number;
  first_name: string;
  last_name: string;
  standard: string;
  amount: number;
  student_id: number;
  comment: string;
  date_of_transection: string;
  mode_of_transection: string;
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

export interface FieldsFeeAnalytics {
  first_name: string;
  last_name: string;
  id?: any;
  student_id?: any;
  total_fee?: any;
  paid_fee?: any;
  unpaid_fee?: any;
  date_of_transection?: any;
  standard?: any;
}
