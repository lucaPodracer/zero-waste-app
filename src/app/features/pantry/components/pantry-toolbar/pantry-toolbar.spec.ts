import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PantryToolbar } from './pantry-toolbar';

describe('PantryToolbar', () => {
  let component: PantryToolbar;
  let fixture: ComponentFixture<PantryToolbar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PantryToolbar],
    }).compileComponents();

    fixture = TestBed.createComponent(PantryToolbar);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
