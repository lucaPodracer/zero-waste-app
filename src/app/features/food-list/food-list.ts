import { Component, OnInit } from '@angular/core'; //OnInit: fast immer benötigt, in die Methode schreibt man alles, was bei initialisieren passieren soll
import { CommonModule } from '@angular/common'; //CommonModule: Wichtig für Aufruf über ngFor ngIf usw.
import { FoodService } from '../../core/services/food-service';
import { Food } from '../../core/models/food';

@Component({
  selector: 'app-food-list',
  imports: [CommonModule],
  templateUrl: './food-list.html',
  styleUrl: './food-list.scss',
})
export class FoodList implements OnInit {

  foods: Food[] = [];

  constructor(private foodService: FoodService) { }

  ngOnInit(): void {
    this.foods = this.foodService.getFoods();
  }
}
