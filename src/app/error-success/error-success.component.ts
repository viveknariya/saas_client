import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { errorSuccess } from '../student/student.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-error-success',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './error-success.component.html',
  styleUrl: './error-success.component.css'
})
export class ErrorSuccessComponent implements OnChanges {
  @Input() errorSuccess!: errorSuccess;

  constructor(){
    this.errorSuccess = {
      isError : false,
      errorSuccessMessage : ""
    }
  }

  popupClose(){
    this.errorSuccess = {
      isError : false,
      errorSuccessMessage : ""
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if ('errorSuccess' in changes) {
      // Update component logic here
      console.log('errorSuccess changed:', this.errorSuccess);
    }
  }
}
