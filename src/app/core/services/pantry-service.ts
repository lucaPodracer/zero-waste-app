import { Injectable, signal } from '@angular/core';
import { Food } from '../models/food';
import { PantryItem, QuantityUnit } from '../models/pantry-item';

export type ExpiryStatus = 'ok' | 'warning' | 'critical' | 'expired';

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

  updateQuantity(id: string, change: number) {
    this.pantryItems.update(items => {

      const updatedItems = items.map(item => {

        if (item.id !== id) {
          return item;
        }

        const newQuantity = (item.quantity ?? 0) + change;

        if (newQuantity <= 0) {
          return item;
        }

        return {
          ...item,
          quantity: newQuantity
        };
      });

      this.saveItems(updatedItems);
      return updatedItems;
    });
  }

  updateItem(updated: PantryItem) {
    this.pantryItems.update(items => {

      const updatedItems = items.map(item =>
        item.id === updated.id ? updated : item
      );

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

    if (!food.averageShelfLifeDays) {
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

    if (!data) {
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

  sortByExpiry(items: PantryItem[]): PantryItem[] {
    const priority = (status: ExpiryStatus) => {
      switch (status) {
        case 'expired': return 0;
        case 'critical': return 1;
        case 'warning': return 2;
        default: return 3;
      }
    };

    return [...items].sort((a, b) => {
      const aInfo = this.getExpiryInfo(a);
      const bInfo = this.getExpiryInfo(b);

      return priority(aInfo.status) - priority(bInfo.status);
    });
  }

  getExpiryInfo(item: PantryItem): {
    days: number | null;
    status: ExpiryStatus;
  } {
    if (!item.expiryDate) {
      return { days: null, status: 'ok' };
    }

    const today = new Date();
    const expiry = new Date(item.expiryDate);

    const days = Math.ceil(
      (expiry.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
    );

    let status: ExpiryStatus;

    if (days < 0) status = 'expired';
    else if (days <= 3) status = 'critical';
    else if (days <= 7) status = 'warning';
    else status = 'ok';

    return { days, status };
  }

  deleteItem(id: string) {
    this.pantryItems.update(items => {

      const updated = items.filter(i => i.id !== id);

      this.saveItems(updated);
      return updated;
    });
  }
}
