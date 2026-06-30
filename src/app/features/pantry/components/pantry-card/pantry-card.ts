import { Component, Input, inject } from '@angular/core';
import { PantryItem } from '../../../../core/models/pantry-item';
import { DatePipe } from '@angular/common';
import { PantryService } from '../../../../core/services/pantry-service';

@Component({
  selector: 'app-pantry-card',
  imports: [DatePipe],
  templateUrl: './pantry-card.html',
  styleUrl: './pantry-card.scss',
})
export class PantryCard {

  @Input() item!: PantryItem;

  private pantryService = inject(PantryService);


  changeQuantity(value: number) {
    this.pantryService.updateQuantity(
      this.item.id,
      value
    );
  }

}