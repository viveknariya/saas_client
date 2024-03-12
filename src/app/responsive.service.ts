import { BreakpointObserver } from '@angular/cdk/layout';
import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ResponsiveService {

  isSmallScreen = signal<boolean>(false);
  showSubMenu = signal<boolean>(false);
  constructor(private breakpointObserver:BreakpointObserver) { 

    this.breakpointObserver.observe(`(max-width: 768px)`)
        .subscribe(state => {
          if (state.matches) {
            this.isSmallScreen.set(true);
          }
          else{
            this.isSmallScreen.set(false);
            this.showSubMenu.set(true);
          }
        });
  }
}
