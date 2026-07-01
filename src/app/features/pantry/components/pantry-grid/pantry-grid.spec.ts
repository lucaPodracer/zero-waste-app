import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PantryGrid } from './pantry-grid';

describe('PantryGrid', () => {
  let component: PantryGrid;
  let fixture: ComponentFixture<PantryGrid>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PantryGrid],
    }).compileComponents();

    fixture = TestBed.createComponent(PantryGrid);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
