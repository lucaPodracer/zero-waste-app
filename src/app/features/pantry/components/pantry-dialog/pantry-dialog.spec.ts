import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PantryDialog } from './pantry-dialog';

describe('PantryDialog', () => {
  let component: PantryDialog;
  let fixture: ComponentFixture<PantryDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PantryDialog],
    }).compileComponents();

    fixture = TestBed.createComponent(PantryDialog);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
