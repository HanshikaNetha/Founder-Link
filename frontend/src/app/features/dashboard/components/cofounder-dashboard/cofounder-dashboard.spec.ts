import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CofounderDashboardComponent } from './cofounder-dashboard.component';

describe('CofounderDashboard', () => {
  let component: CofounderDashboardComponent;
  let fixture: ComponentFixture<CofounderDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CofounderDashboardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CofounderDashboardComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
