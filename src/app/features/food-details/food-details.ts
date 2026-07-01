import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Food } from '../../core/models/food';
import { FoodService } from '../../core/services/food-service';

@Component({
  selector: 'app-food-details',
  imports: [CommonModule],
  templateUrl: './food-details.html',
  styleUrl: './food-details.scss',
})
export class FoodDetails implements OnInit {
food: Food | undefined;

  monthNames: string[] = [
    'Januar', 'Februar', 'März', 'April', 'Mai', 'Juni',
    'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember',
  ];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private foodService: FoodService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.food = this.foodService.getFoodById(id);
  }

  get seasonRange(): string {
    if (!this.food || this.food.seasonMonths.length === 0) return '–';
    const sorted = [...this.food.seasonMonths].sort((a, b) => a - b);
    const first = this.monthNames[sorted[0]];
    const last = this.monthNames[sorted[sorted.length - 1]];
    return first === last ? first : `${first} – ${last}`;
  }

  goBack() {
    this.router.navigate(['/food-list']);
  }
}

