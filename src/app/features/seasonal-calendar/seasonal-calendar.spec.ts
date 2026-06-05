import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeasonalCalendar } from './seasonal-calendar';

describe('SeasonalCalendar', () => {
  let component: SeasonalCalendar;
  let fixture: ComponentFixture<SeasonalCalendar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SeasonalCalendar],
    }).compileComponents();

    fixture = TestBed.createComponent(SeasonalCalendar);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
