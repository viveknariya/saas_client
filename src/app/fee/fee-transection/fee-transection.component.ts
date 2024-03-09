import { Component, OnInit } from '@angular/core';
import { FieldsFee } from '../fee.service';
import { HttpClient } from '@angular/common/http';
import { BackendConstant } from '../../backend';
import { FieldsStudent } from '../../student/student.service';

@Component({
  selector: 'app-fee-transection',
  standalone: true,
  imports: [],
  templateUrl: './fee-transection.component.html',
  styleUrl: './fee-transection.component.css'
})
export class FeeTransectionComponent implements OnInit {
  store:FieldsFee[] = [];
  constructor(private httpClient:HttpClient){}
  ngOnInit(): void {
    this.httpClient.get<FieldsFee[]>(`${BackendConstant.BASE_URL}/api/FeeTransection`).subscribe({
      next: (data:FieldsFee[]) => {
        this.store = data;
      },
      error: (err) => {
      
      }
      ,complete: () => {
      }
    })

  }
}
