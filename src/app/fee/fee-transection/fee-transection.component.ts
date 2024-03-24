import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { DateWithoutTPipe } from '../../date-without-t.pipe';
import { FeeTransection, FeeTransectionDto } from '../fee.service';

@Component({
  selector: 'app-fee-transection',
  standalone: true,
  imports: [DateWithoutTPipe],
  templateUrl: './fee-transection.component.html',
  styleUrl: './fee-transection.component.css'
})
export class FeeTransectionComponent implements OnInit {
  store:FeeTransectionDto[] = [];
  constructor(private httpClient:HttpClient){}
  ngOnInit(): void {
    this.httpClient.get<FeeTransectionDto[]>(`${environment.apiUrl}/api/FeeTransection`).subscribe({
      next: (data:FeeTransectionDto[]) => {
        this.store = data;
      },
      error: (err) => {
      
      }
      ,complete: () => {
      }
    })

  }
}
