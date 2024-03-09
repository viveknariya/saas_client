import { Injectable, signal } from '@angular/core';
import { FieldsFee } from '../../fee/fee.service';

@Injectable({
  providedIn: 'root'
})
export class StudentFeeService {
  modeOfTransections:ModeOfTransections[] = [
    {name:'Cash',value:'cash'},
    {name:'Cheque',value:'cheque'},
    {name:'Online',value:'online'},
    {name:'Other',value:'other'}
  ] 
  selectedStudentFee = signal<FieldsFee>({} as FieldsFee);
  selectedStudentFeeAddMode = signal<boolean>(true);
  constructor() { }


}

export interface ModeOfTransections{
  name:string;
  value:string;
}
