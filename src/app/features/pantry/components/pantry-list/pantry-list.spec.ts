import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PantryList } from './pantry-list';

describe('PantryList', () => {
  let component: PantryList;
  let fixture: ComponentFixture<PantryList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PantryList],
    }).compileComponents();

    fixture = TestBed.createComponent(PantryList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
