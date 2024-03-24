import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import { FeeService, FeeStructure, NameValue } from '../fee.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-add-edit-fee-structure',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './add-edit-fee-structure.component.html',
  styleUrl: './add-edit-fee-structure.component.css'
})
export class AddEditFeeStructureComponent {
  isAddMode!: boolean;
  actionMessage!: string;
  addEditFeeStructure!: FormGroup;
  Period:NameValue[] = [];

  addEditStudentFee(){
    if(this.isAddMode){
      this.httpClient.post<FeeStructure>(`${environment.apiUrl}/api/FeeStructure`,this.addEditFeeStructure.value).subscribe({
        next: (data:FeeStructure) => {
          this.addEditFeeStructure.patchValue(data);
          this.actionMessage = "Added Successfully"
          setTimeout(() => {
            this.actionMessage = "";
          }, 2000);
        },
        error: (error:any) => {
          console.log(error)
        },
        complete: () => {}
      })
    }
    else{
        this.addEditFeeStructure.controls["id"].enable();
        this.httpClient.put<FeeStructure>(`${environment.apiUrl}/api/FeeStructure`,this.addEditFeeStructure.value).subscribe({
        next: (data:FeeStructure) => {
          this.addEditFeeStructure.patchValue(data);
          this.actionMessage = "Edited Successfully"
          setTimeout(() => {
            this.actionMessage = "";
          }, 2000);
        },
        error: (error:any) => {
          console.log(error)
        },
        complete: () => {
          this.addEditFeeStructure.controls["id"].disable();
        }
      })
    }

  }
  resetForm(){
    this.addEditFeeStructure.setValue(this.feeService.selectedFeeStructure());
  }

  constructor(private feeService:FeeService,private router:Router,private httpClient:HttpClient){
    this.Period = feeService.Period;
    this.actionMessage = "";
    this.isAddMode = this.feeService.selectedFeeStructureFormMode();
    this.addEditFeeStructure = new FormGroup({
      id:new FormControl({value:this.feeService.selectedFeeStructure().id,disabled:true}),
      comment: new FormControl(),
      offset:new FormControl(),
      period:new FormControl(this.Period[0].value),
      amount:new FormControl(),
      structure_name:new FormControl(),
    })
    if(!this.isAddMode){
      this.addEditFeeStructure.patchValue(this.feeService.selectedFeeStructure());
    }
  }

  popupClose(){
    this.actionMessage = "";
  }
}
