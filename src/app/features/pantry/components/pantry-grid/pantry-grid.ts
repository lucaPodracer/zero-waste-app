import { Component, Input } from '@angular/core';
import { PantryItem } from '../../../../core/models/pantry-item';
import { PantryService } from '../../../../core/services/pantry-service';
import { PantryCard } from '../pantry-card/pantry-card';

@Component({
  selector: 'app-pantry-grid',
  standalone: true,
  imports: [PantryCard],
  templateUrl: './pantry-grid.html',
  styleUrl: './pantry-grid.scss',
})
export class PantryGrid {

  @Input() items: PantryItem[] = [];

  constructor(public pantryService: PantryService) { }

  get filteredItems(): PantryItem[] {
    return [...(this.items ?? [])].sort((a, b) => {
      const aDate = a.expiryDate ? new Date(a.expiryDate).getTime() : Number.MAX_SAFE_INTEGER;
      const bDate = b.expiryDate ? new Date(b.expiryDate).getTime() : Number.MAX_SAFE_INTEGER;

      return aDate - bDate;
    });
  }
}