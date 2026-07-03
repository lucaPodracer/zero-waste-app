import { Component, Signal, inject } from '@angular/core';
import { PantryService } from '../../core/services/pantry-service';
import { PantryItem } from '../../core/models/pantry-item';
import { PantryCard } from './components/pantry-card/pantry-card';
import { MatDialog } from '@angular/material/dialog';
import { PantryDialog } from './components/pantry-dialog/pantry-dialog';
import { PantryList } from './components/pantry-list/pantry-list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-pantry',
  imports: [
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    PantryCard,
    PantryList,
    FormsModule,
    MatFormFieldModule,
    MatInputModule
  ],
  templateUrl: './pantry.html',
  styleUrl: './pantry.scss',
})
export class Pantry {

  viewMode: 'grid' | 'list' = 'grid';
  selectedCategory = 'Alle';
  searchText = '';

  pantryItems: Signal<PantryItem[]>;


  private dialog = inject(MatDialog);


  constructor(
    private pantryService: PantryService
  ) {
    this.pantryItems = this.pantryService.getItems();
  }


  openAddDialog() {

    this.dialog.open(PantryDialog, {
      width: '400px'
    });
  }

  get sortedPantryItems(): PantryItem[] {
    return [...this.pantryItems()].sort((a, b) => {
      const aDate = a.expiryDate ? new Date(a.expiryDate).getTime() : Number.MAX_SAFE_INTEGER;
      const bDate = b.expiryDate ? new Date(b.expiryDate).getTime() : Number.MAX_SAFE_INTEGER;

      return aDate - bDate;
    });
  }

  get filteredItems(): PantryItem[] {
    const text = this.searchText.trim().toLowerCase();

    const items = this.pantryItems();

    if (!text) return items;

    return items.filter(item =>
      item.food.name.toLowerCase().includes(text)
    );
  }

}