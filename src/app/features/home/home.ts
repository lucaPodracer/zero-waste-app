import { Component, OnInit } from '@angular/core';
import { FoodPreviewCard } from './food-preview-card/food-preview-card';
import { Food } from '../../core/models/food';
import { FoodService } from '../../core/services/food-service';

@Component({
  selector: 'app-home',
  imports: [FoodPreviewCard],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home implements OnInit {
  seasonalFoods: Food[] = [];
  previewFoods: Food[] = [];

  constructor(private foodService: FoodService) {}

  ngOnInit(): void {
    // Anhand des aktuellen Datums saisonale Lebensmittel speichern
    const currentDate = new Date();
    this.seasonalFoods = this.foodService.getFoodsBySeason(currentDate.getMonth());

    // Zufällige Lebensmittel für die Vorschau ermitteln und sicherstellen, dass keins doppelt vorkommt
    const randomIndices = [...Array(this.seasonalFoods.length).keys()]
      .sort(() => Math.random() - 0.5)
      .slice(0, 3);   // insgesamt 3 Elemente

    for (const index of randomIndices) {
      this.previewFoods.push(this.seasonalFoods[index]);
    }
  }

  //TODO: Methode für bald ablaufende Lebensmittel aus der Vorratskammer implementieren.
  //      Dafür wird vermutlich ein "PantryService" oder sowas nötig sein
}
