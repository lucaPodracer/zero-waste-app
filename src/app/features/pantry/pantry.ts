import { Component, Signal, inject } from '@angular/core';
import { PantryService } from '../../core/services/pantry-service';
import { PantryItem } from '../../core/models/pantry-item';
import { PantryCard } from './components/pantry-card/pantry-card';
import { MatDialog } from '@angular/material/dialog';
import { PantryDialog } from './components/pantry-dialog/pantry-dialog';

@Component({
  selector: 'app-pantry',
  imports: [
    PantryCard
  ],
  templateUrl: './pantry.html',
  styleUrl: './pantry.scss',
})
export class Pantry {

  viewMode: 'grid' | 'list' = 'grid';
  selectedCategory = 'Alle';

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

}