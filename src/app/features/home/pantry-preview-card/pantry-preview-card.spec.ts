import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PantryPreviewCard } from './pantry-preview-card';

describe('PantryPreviewCard', () => {
  let component: PantryPreviewCard;
  let fixture: ComponentFixture<PantryPreviewCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PantryPreviewCard],
    }).compileComponents();

    fixture = TestBed.createComponent(PantryPreviewCard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
