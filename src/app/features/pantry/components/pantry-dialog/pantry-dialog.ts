import { Component, inject } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Food } from '../../../../core/models/food';
import { FoodService } from '../../../../core/services/food-service';
import { PantryService } from '../../../../core/services/pantry-service';
import { QuantityUnit } from '../../../../core/models/pantry-item';
import { FormsModule } from '@angular/forms';
//Datepicker Modul nötige imports
import { MatFormField } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

@Component({
  selector: 'app-pantry-dialog',
  imports: [FormsModule, MatFormField, MatInputModule, MatDatepickerModule, MatNativeDateModule],
  templateUrl: './pantry-dialog.html',
  styleUrl: './pantry-dialog.scss'
})
export class PantryDialog {

  private dialogRef = inject(MatDialogRef<PantryDialog>);
  private pantryService = inject(PantryService);
  private foodService = inject(FoodService);

  restockDate = new Date();
  expiryDate?: Date;
  quantity?: number;
  unit?: QuantityUnit;
  searchText = '';
  filteredFoods: Food[] = [];
  selectedFood?: Food;

  save() {
    const food: Food = this.selectedFood ?? {
      id: Date.now(),
      name: this.searchText,
      category: 'Sonstiges',
      seasonMonths: []
    };

    this.pantryService.addItem(
      this.selectedFood!,
      this.quantity,
      this.unit,
      this.restockDate,
      this.expiryDate
    );
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