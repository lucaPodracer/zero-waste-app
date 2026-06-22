import { Component } from '@angular/core';
import { FoodPreviewCard } from './food-preview-card/food-preview-card';

@Component({
  selector: 'app-home',
  imports: [FoodPreviewCard],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {}
