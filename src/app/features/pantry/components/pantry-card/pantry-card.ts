import { Component, Input, inject } from '@angular/core';
import { PantryItem } from '../../../../core/models/pantry-item';
import { DatePipe } from '@angular/common';
import { PantryService } from '../../../../core/services/pantry-service';
import { PantryDialog } from '../pantry-dialog/pantry-dialog';
import { MatDialog } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { ConfirmDialog } from '../../../../shared/confirm-dialog/confirm-dialog';

@Component({
  selector: 'app-pantry-card',
  imports: [DatePipe, CommonModule],
  templateUrl: './pantry-card.html',
  styleUrl: './pantry-card.scss',
})
export class PantryCard {

  @Input() item!: PantryItem;

  pantryService = inject(PantryService);
  private dialog = inject(MatDialog);

  isEditMode = false;
  editingItem?: PantryItem;

  changeQuantity(value: number) {
    this.pantryService.updateQuantity(this.item.id, value);
  }

  get expiry() {
    return this.pantryService.getExpiryInfo(this.item);
  }

  editItem() {
    this.dialog.open(PantryDialog, {
      data: this.item
    });
  }

  deleteItem() {
    this.dialog.open(ConfirmDialog, {
      data: {}
    }).afterClosed().subscribe((result) => {
      if (result) {
        this.pantryService.deleteItem(this.item.id);
      }
    });
  }
}