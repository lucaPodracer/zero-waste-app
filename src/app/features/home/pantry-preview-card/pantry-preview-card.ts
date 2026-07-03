// noinspection AngularUnusedComponentImport

import { Component, Input } from '@angular/core';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-pantry-preview-card',
  // eslint-disable-next-line @angular-eslint/no-unused-vars
  imports: [DatePipe],
  templateUrl: './pantry-preview-card.html',
  styleUrl: './pantry-preview-card.scss',
})
export class PantryPreviewCard {
  @Input() pantryItemName: string = '';
  @Input() expiryDate?: Date;
}
