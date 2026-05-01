import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvestorDashboardComponent } from './investor-dashboard.component';

describe('InvestorDashboard', () => {
  let component: InvestorDashboardComponent;
  let fixture: ComponentFixture<InvestorDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InvestorDashboardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(InvestorDashboardComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
