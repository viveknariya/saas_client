import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { DateWithoutTPipe } from '../../date-without-t.pipe';
import { FieldFeeTransection } from '../fee.service';

@Component({
  selector: 'app-fee-transection',
  standalone: true,
  imports: [DateWithoutTPipe],
  templateUrl: './fee-transection.component.html',
  styleUrl: './fee-transection.component.css'
})
export class FeeTransectionComponent implements OnInit {
  store:FieldFeeTransection[] = [];
  constructor(private httpClient:HttpClient){}
  ngOnInit(): void {
    this.httpClient.get<FieldFeeTransection[]>(`${environment.apiUrl}/api/FeeTransection`).subscribe({
      next: (data:FieldFeeTransection[]) => {
        this.store = data;
      },
      error: (err) => {
      
      }
      ,complete: () => {
      }
    })

  }
}
