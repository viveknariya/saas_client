import { HttpClient } from '@angular/common/http';
import { Component, effect } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { FeeService, FeeStructure, } from '../fee.service';

@Component({
  selector: 'app-fee-structure',
  standalone: true,
  imports: [],
  templateUrl: './fee-structure.component.html',
  styleUrl: './fee-structure.component.css'
})
export class FeeStructureComponent {
  store:FeeStructure[] =[];
  constructor(private httpClient:HttpClient,private router:Router,private feeService:FeeService){
  }

  ngOnInit(): void {
    this.httpClient.get<FeeStructure[]>(`${environment.apiUrl}/api/FeeStructure`).subscribe({
      next: (data:FeeStructure[]) => {
        this.store = data as FeeStructure[];
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

  manageStructure(item:FeeStructure){
    this.feeService.selectedFeeStructure.set(item);
    this.feeService.selectedFeeStructureFormMode.set(false);
    this.router.navigate(['/fee/addEditFeeStructure']);
  }
}
