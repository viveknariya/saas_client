import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { StudentService, Standard } from './student.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-student',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './student.component.html',
  styleUrl: './student.component.css'
})
export class StudentComponent {
  constructor(private studentService:StudentService){
    this.studentService.selectedStandard.set(this.studentService.standards[0])
  }
}
