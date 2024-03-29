import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { environment } from '../../../environments/environment';
import Chart from 'chart.js/auto';
import { FeeAnalyticsDto } from '../fee.service';
import { DateWithoutTPipe } from "../../date-without-t.pipe";


@Component({
    selector: 'app-fee-analytisc',
    standalone: true,
    templateUrl: './fee-analytics.component.html',
    styles: `
  `,
    imports: [HttpClientModule, DateWithoutTPipe]
})
export class FeeAnalyticsComponent implements OnInit,AfterViewInit {
  store:FeeAnalyticsDto[] = [];
  total:number = 0;
  paid:number = 120000;
  unpaid:number = 50000;
  constructor(private httpClient:HttpClient){}
  ngAfterViewInit(): void {    
    this.createPieChart();
  }
  ngOnInit(): void {
    this.httpClient.get(`${environment.apiUrl}/api/FeeAnalytics`).subscribe({
      next: (data:any) => {
        this.store = data.result1;
        this.unpaid = data.result2[0].total_fee - data.result2[0].paid_fee;
        this.paid = data.result2[0].paid_fee;

        this.pieChart.data.datasets[0].data = [this.paid, this.unpaid];
        this.pieChart.update();
      },
      error: (err) => {
      
      }
      ,complete: () => {
      }
    })
  }


  @ViewChild('canvas')
  private pieChartRef!: ElementRef;
  private pieChart: any;

  private createPieChart() {
    const ctx = this.pieChartRef.nativeElement;
    this.pieChart = new Chart(ctx, {
      type: 'pie',
      data: {
        labels: ['Paid', 'UnPaid'],
        datasets: [{
          label: 'Dataset',
          data: [this.paid, this.unpaid],
          backgroundColor: ['#FF6384', '#4CAF50']
        }]
      }
    });
  }

}
