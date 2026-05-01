import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateStartup } from './create-startup';

describe('CreateStartup', () => {
  let component: CreateStartup;
  let fixture: ComponentFixture<CreateStartup>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateStartup],
    }).compileComponents();

    fixture = TestBed.createComponent(CreateStartup);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
