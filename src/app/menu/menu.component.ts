import { Component, effect } from '@angular/core';
import { Router } from '@angular/router';
import { Standard, StudentService } from '../student/student.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent {
  selectedMenu!: string;
  Standards:Standard[]=[];
  activeStandard!: Standard;
  constructor(private studentService:StudentService,private router:Router){
    this.Standards = this.studentService.standards;
    this.selectedMenu = "student";
    effect(() => {
      this.activeStandard = this.studentService.selectedStandard();
    })
  }
  standardFilter(item:Standard){
    this.studentService.selectedStandard.set(item);
    this.router.navigate(['/student']);
  }
  toNavigate(val:string){
    this.selectedMenu = val; 
    this.router.navigate([val])
    this.studentService.selectedStandard.set(this.studentService.standards[0]);

  }

  
}
