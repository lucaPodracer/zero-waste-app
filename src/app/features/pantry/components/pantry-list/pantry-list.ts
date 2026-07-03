import { Component, Input, inject } from '@angular/core';
import { PantryItem } from '../../../../core/models/pantry-item';
import { PantryService } from '../../../../core/services/pantry-service';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { PantryDialog } from '../pantry-dialog/pantry-dialog';
import { MatTableModule } from '@angular/material/table';
import { ConfirmDialog } from '../../../../shared/confirm-dialog/confirm-dialog';

@Component({
  selector: 'app-pantry-list',
  standalone: true,
  imports: [CommonModule, MatTableModule],
  templateUrl: './pantry-list.html',
  styleUrl: './pantry-list.scss'
})
export class PantryList {

  @Input() items: PantryItem[] = [];

  private dialog = inject(MatDialog);
  pantryService = inject(PantryService);

  displayedColumns: string[] = [
    'name',
    'category',
    'quantity',
    'expiry',
    'actions'
  ];

  get sortedItems(): PantryItem[] {
    return this.pantryService.sortByExpiry(this.items ?? []);
  }

  editItem(item: PantryItem) {
    this.dialog.open(PantryDialog, { data: item });
  }

  deleteItem(item: PantryItem) {
    const dialogRef = this.dialog.open(ConfirmDialog);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.pantryService.deleteItem(item.id);
      }
    });
  }
}