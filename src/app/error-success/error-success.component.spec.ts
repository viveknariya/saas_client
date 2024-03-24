import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrorSuccessComponent } from './error-success.component';

describe('ErrorSuccessComponent', () => {
  let component: ErrorSuccessComponent;
  let fixture: ComponentFixture<ErrorSuccessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ErrorSuccessComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ErrorSuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
