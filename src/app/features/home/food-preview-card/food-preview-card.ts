import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-food-preview-card',
  imports: [],
  templateUrl: './food-preview-card.html',
  styleUrl: './food-preview-card.scss',
})
export class FoodPreviewCard {
  @Input() foodName: string = "";
  @Input() imageUrl?: string = "";
  @Input() previewText?: string = "";
}
