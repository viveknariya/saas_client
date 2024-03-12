import { Component, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet } from '@angular/router';
import { MenuComponent } from './menu/menu.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ResponsiveService } from './responsive.service';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet,MenuComponent,HttpClientModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'SFMS';

  isSmallScreen!:boolean;
  showSubMenu!:boolean;

  constructor(private router:Router,private responsive:ResponsiveService){
    this.router.navigate(['/student']);

    effect(() => {
      this.isSmallScreen = this.responsive.isSmallScreen();
      this.showSubMenu = this.responsive.showSubMenu();
    })
  }
}
