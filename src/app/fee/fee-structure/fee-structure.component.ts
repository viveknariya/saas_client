import { HttpClient } from '@angular/common/http';
import { Component, effect } from '@angular/core';
import { Router } from '@angular/router';
import { BackendConstant } from '../../backend';
import { FieldsStudent} from '../../student/student.service';
import { FeeService, FieldsFeeStructure } from '../fee.service';

@Component({
  selector: 'app-fee-structure',
  standalone: true,
  imports: [],
  templateUrl: './fee-structure.component.html',
  styleUrl: './fee-structure.component.css'
})
export class FeeStructureComponent {
  store:FieldsFeeStructure[] =[];
  constructor(private httpClient:HttpClient,private router:Router,private feeService:FeeService){
  }

  ngOnInit(): void {
    this.httpClient.get<FieldsFeeStructure[]>(`${BackendConstant.BASE_URL}/api/FeeStructure`).subscribe({
      next: (data:FieldsFeeStructure[]) => {
        this.store = data as FieldsFeeStructure[];
      },
      error: (err) => {
      
      }
      ,complete: () => {
      }
    })
  }

  addStructure(){
    this.feeService.selectedFeeStructureFormMode.set(true);
    this.router.navigate(['/fee/addEditFeeStructure']);
  }

  manageStructure(item:FieldsFeeStructure){
    this.feeService.selectedFeeStructure.set(item);
    this.feeService.selectedFeeStructureFormMode.set(false);
    this.router.navigate(['/fee/addEditFeeStructure']);
  }
}
