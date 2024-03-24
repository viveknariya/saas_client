import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FeeService {

  modeOfTransections:NameValue[] = [
    {name:'Cash',value:'cash'},
    {name:'Cheque',value:'cheque'},
    {name:'Online',value:'online'},
    {name:'Other',value:'other'}
  ] 
  selectedStudentFee = signal<Fee>({} as Fee);

  Period:NameValue[] = [
    {name:'Monthly',value:'month'},
    {name:'Yearly',value:'year'},
  ] 

  TypeOfFee:NameValue[] = [
    {name:'Tuition',value:'tuition'},
    {name:'Stationary',value:'stationary'},
  ]

  TypeOfTransection:NameValue[] = [
    {name:'Credit',value:true},
    {name:'Debit',value:false},
  ]

  constructor() { }
  selectedFeeStructure = signal<FeeStructure>({} as FeeStructure);
  selectedFeeStructureFormMode = signal<boolean>(true);
}
export interface Fee {
  amount: number;
  student_id: string;
  id: number;
  mode_of_transection?: string;
  date_of_transection: string;
  comment:string;
}

export interface FeeTransectionDto {
  id: number;
  first_name: string;
  last_name: string;
  standard: string;
  amount: number;
  student_id: number;
  comment: string;
  date_of_transection: string;
  mode_of_transection: string;
  is_credit: boolean;
  type_of_fee: string;
}

export interface FeeTransection {
  id: number;
  amount: number;
  student_id: number;
  comment: string;
  date_of_transection: string;
  mode_of_transection: string;
  is_credit: boolean;
  type_of_fee: string;
}


export interface FeeStructure {
  id: string;
  structure_name: string;
  amount: number;
  period: string;
  offset: string;
  comment: string;
}

export interface NameValue{
  name:string;
  value:any;
}

export interface FeeAnalyticsDto {
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


