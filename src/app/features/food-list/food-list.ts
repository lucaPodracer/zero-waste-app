import { Component, OnInit } from '@angular/core'; //OnInit: fast immer benötigt, in die Methode schreibt man alles, was bei initialisieren passieren soll
import { CommonModule } from '@angular/common'; //CommonModule: Wichtig für Aufruf über ngFor ngIf usw.
import { Router } from '@angular/router';  
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

  constructor(private foodService: FoodService,
     private router: Router
  ) { }

  ngOnInit(): void {
    this.foods = this.foodService.getFoods();
  }

   goToDetail(id: number) {
    this.router.navigate(['/food-details', id]);      //wichtig für route 
  }
}

