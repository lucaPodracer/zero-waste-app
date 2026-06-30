import { Injectable, signal } from '@angular/core';
import { Food } from '../models/food';
import { PantryItem, QuantityUnit } from '../models/pantry-item';

@Injectable({
  providedIn: 'root'
})
export class PantryService {

  private storageKey = 'pantry-items';

  private pantryItems = signal<PantryItem[]>(
    this.loadItems()
  );


  addItem(
    food: Food,
    quantity?: number,
    unit?: QuantityUnit,
    restockDate?: Date,
    expiryDate?: Date
  ) {

    const added = restockDate ?? new Date();

    const item: PantryItem = {
      id: crypto.randomUUID(),
      food,
      quantity,
      unit,
      restockDate: added,
      expiryDate: expiryDate ?? this.calculateExpiryDate(food, added)
    };


    this.pantryItems.update(items => {

      const updatedItems = [
        ...items,
        item
      ];

      this.saveItems(updatedItems);

      return updatedItems;
    });

  }


  updateQuantity(
    id: string,
    change: number
  ) {

    this.pantryItems.update(items => {

      const updatedItems = items.map(item => {

        if(item.id !== id) {
          return item;
        }


        return {
          ...item,
          quantity: Math.max(
            0,
            (item.quantity ?? 0) + change
          )
        };

      });


      this.saveItems(updatedItems);

      return updatedItems;

    });

  }


  getItems() {
    return this.pantryItems;
  }


  private calculateExpiryDate(
    food: Food,
    restockDate: Date
  ): Date | undefined {

    if(!food.averageShelfLifeDays) {
      return undefined;
    }


    const date = new Date(restockDate);


    date.setDate(
      date.getDate() + food.averageShelfLifeDays
    );


    return date;

  }



  private loadItems(): PantryItem[] {

    const data = localStorage.getItem(
      this.storageKey
    );


    if(!data) {
      return [];
    }


    const items: PantryItem[] = JSON.parse(data);


    return items.map(item => ({
      ...item,
      restockDate: new Date(item.restockDate),
      expiryDate: item.expiryDate
        ? new Date(item.expiryDate)
        : undefined
    }));

  }



  private saveItems(
    items: PantryItem[]
  ) {

    localStorage.setItem(
      this.storageKey,
      JSON.stringify(items)
    );

  }

}