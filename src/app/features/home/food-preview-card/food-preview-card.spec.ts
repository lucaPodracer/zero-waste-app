import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FoodPreviewCard } from './food-preview-card';

describe('FoodPreviewCard', () => {
  let component: FoodPreviewCard;
  let fixture: ComponentFixture<FoodPreviewCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FoodPreviewCard],
    }).compileComponents();

    fixture = TestBed.createComponent(FoodPreviewCard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
