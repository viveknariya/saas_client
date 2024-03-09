import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeeTransectionComponent } from './fee-transection.component';

describe('FeeTransectionComponent', () => {
  let component: FeeTransectionComponent;
  let fixture: ComponentFixture<FeeTransectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FeeTransectionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FeeTransectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
