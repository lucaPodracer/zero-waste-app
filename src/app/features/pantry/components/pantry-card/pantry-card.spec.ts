import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PantryCard } from './pantry-card';

describe('PantryCard', () => {
  let component: PantryCard;
  let fixture: ComponentFixture<PantryCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PantryCard],
    }).compileComponents();

    fixture = TestBed.createComponent(PantryCard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
