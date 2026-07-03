import { Component, inject, OnInit, Signal } from '@angular/core';
import { FoodPreviewCard } from './food-preview-card/food-preview-card';
import { Food } from '../../core/models/food';
import { FoodService } from '../../core/services/food-service';
import { PantryItem } from '../../core/models/pantry-item';
import { PantryService } from '../../core/services/pantry-service';
import { PantryPreviewCard } from './pantry-preview-card/pantry-preview-card';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { PantryDialog } from '../pantry/components/pantry-dialog/pantry-dialog';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-home',
  imports: [MatButtonModule, MatIconModule, RouterModule, FoodPreviewCard, PantryPreviewCard],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home implements OnInit {
  seasonalFoods: Food[] = [];
  previewFoods: Food[] = [];
  pantryItemsSignal: Signal<PantryItem[]>;
  pantryItems: PantryItem[] = [];
  expiringPantryItems: PantryItem[] = [];

  // Dialog fürs Hinzufügen von Lebensmitteln / Einkäufen
  private pantryDialog = inject(MatDialog);

  constructor(
    private foodService: FoodService,
    private pantryService: PantryService,
  ) {
    this.pantryItemsSignal = this.pantryService.getItems();
  }

  ngOnInit(): void {
    // Anhand des aktuellen Datums saisonale Lebensmittel speichern
    const currentDate = new Date();
    this.seasonalFoods = this.foodService.getFoodsBySeason(currentDate.getMonth());

    // Zufällige saisonale Lebensmittel für die Vorschau ermitteln und sicherstellen, dass keins doppelt vorkommt
    const randomIndices = [...Array(this.seasonalFoods.length).keys()]
      .sort(() => Math.random() - 0.5)
      .slice(0, 3); // insgesamt 3 Elemente

    for (const index of randomIndices) {
      this.previewFoods.push(this.seasonalFoods[index]);
    }

    // FIXME: Die Erbeeren tauchen irgendwie nicht bei den bald ablaufenden Items auf...
    // Items aus der Vorratsliste laden:
    this.pantryItemsSignal = this.pantryService.getItems();
    this.pantryItems = this.pantryItemsSignal();

    // Alle Lebensmittel filtern, die in 5 Tagen oder weniger ablaufen:
    const daysBeforeExpiring = 5;
    const itemWarningDate = new Date();

    this.expiringPantryItems = this.pantryItems.filter((item) => {
      if (!item.expiryDate) {
        // Artikel ohne Ablaufdatum werden mit berücksichtigt
        return true;
      }
      itemWarningDate.setDate(item.expiryDate.getDate() - daysBeforeExpiring);
      return currentDate.getDate() >= itemWarningDate.getDate();
    });
  }

  openPantryDialog() {
    this.pantryDialog.open(PantryDialog, {
      width: '50%',
    });
  }
}
