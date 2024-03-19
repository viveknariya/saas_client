import { Component, Input, effect } from '@angular/core';
import { Router } from '@angular/router';
import { Standard, StudentService } from '../student/student.service';
import { CommonModule } from '@angular/common';
import { ResponsiveService } from '../responsive.service';

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

  isSmallScreen!:boolean;
  showSubMenu!:boolean;

  showStudent: boolean = true;

  constructor(private studentService:StudentService,private router:Router,private responsive:ResponsiveService){
    this.Standards = this.studentService.standards;
    this.selectedMenu = "student";
    effect(() => {
      this.activeStandard = this.studentService.selectedStandard();
      this.isSmallScreen = this.responsive.isSmallScreen();
      this.showSubMenu = this.responsive.showSubMenu();
    })
  }
  
  subMenuToggle(){
    this.responsive.showSubMenu.set(!this.showSubMenu);
  }
  
  toNavigate(val:string){
    if(this.selectedMenu != val){
      this.responsive.showSubMenu.set(true);
    }
    else{
      this.subMenuToggle();
    }
    if(val == "student"){
      this.showStudent = true;
    }
    else{
      this.showStudent = false;
    }
    this.selectedMenu = val; 
    this.router.navigate([val])
    this.studentService.selectedStandard.set(this.studentService.standards[0]);
  }

  toNavigateSub(val:string){
    this.responsive.showSubMenu.set(false);
    this.router.navigate([val])
    this.studentService.selectedStandard.set(this.studentService.standards[0]);
  }
}
