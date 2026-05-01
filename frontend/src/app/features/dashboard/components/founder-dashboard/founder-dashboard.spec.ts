import { ComponentFixture, TestBed } from '@angular/core/testing';

import {  FounderDashboardComponent} from './founder-dashboard.component';

describe('FounderDashboard', () => {
  let component: FounderDashboardComponent;
  let fixture: ComponentFixture<FounderDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FounderDashboardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FounderDashboardComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
