import { Component, inject } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Food } from '../../../../core/models/food';
import { FoodService } from '../../../../core/services/food-service';
import { PantryService } from '../../../../core/services/pantry-service';
import { QuantityUnit } from '../../../../core/models/pantry-item';
import { FormsModule } from '@angular/forms';
import { PantryItem } from '../../../../core/models/pantry-item';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
//Datepicker Modul nötige imports
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-pantry-dialog',
  imports: [FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCardModule],
  templateUrl: './pantry-dialog.html',
  styleUrl: './pantry-dialog.scss'
})
export class PantryDialog {

  private dialogRef = inject(MatDialogRef<PantryDialog>);
  private pantryService = inject(PantryService);
  private foodService = inject(FoodService);
  private data = inject<PantryItem | null>(MAT_DIALOG_DATA);

  restockDate = new Date();
  expiryDate?: Date;
  quantity?: number;
  unit?: QuantityUnit;
  searchText = '';
  filteredFoods: Food[] = [];
  selectedFood?: any;

  isEditMode = false;
  editingItem: PantryItem | null = null;

  ngOnInit() {
    if (this.data) {
      this.isEditMode = true;
      this.editingItem = this.data;

      this.selectedFood = this.data.food;
      this.searchText = this.data.food.name;
      this.quantity = this.data.quantity;
      this.unit = this.data.unit;
      this.restockDate = this.data.restockDate;
      this.expiryDate = this.data.expiryDate;
    }
  }

  save() {
  const name = this.selectedFood?.name ?? this.searchText?.trim();

  if (!name) return;
  if (!this.quantity || this.quantity < 1) return;

  const food = this.selectedFood ?? {
    id: Date.now(),
    name,
    category: 'Sonstiges',
    seasonMonths: []
  };

  const item: PantryItem = {
    id: this.editingItem?.id ?? crypto.randomUUID(),
    food,
    quantity: this.quantity,
    unit: this.unit,
    restockDate: this.restockDate,
    expiryDate: this.expiryDate
  };

  if (this.isEditMode) {
    this.pantryService.updateItem(item);
  } else {
    this.pantryService.addItem(
      food,
      this.quantity,
      this.unit,
      this.restockDate,
      this.expiryDate
    );
  }

  this.dialogRef.close();
}


  cancel() {
    this.dialogRef.close();
  }

  onSearch() {
    this.filteredFoods = this.foodService.searchForFood(
      this.searchText
    );
  }

  selectFood(food: Food) {
    this.selectedFood = food;
    this.searchText = food.name;

    this.filteredFoods = [];
  }

}