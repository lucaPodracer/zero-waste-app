import { Injectable } from '@angular/core';
import { Food } from '../models/food';
import foodsData from '../data/foods.json';
import { OpenFoodFactsService } from './openfoodfacts-service';
import { debounceTime, map, of } from 'rxjs';
import { FoodCategory } from '../models/food';

@Injectable({
  providedIn: 'root',
})
export class FoodService {

  private foods: Food[] = foodsData as Food[];

  constructor(
    private openFoodFacts: OpenFoodFactsService
  ) { }

  // GETTER
  getFoods(): Food[] {
    return this.foods;
  }

  getFoodById(id: number): Food | undefined {
    return this.foods.find(food => food.id === id);
  }

  getFoodsBySeason(month: number): Food[] {
    return this.foods.filter(food => food.seasonMonths.includes(month));
  }

  // SEARCH (LOCAL + API)
  searchForFood(text: string, useApi: boolean = false) {
    const local = this.getLocalFoods(text);

    if (!useApi) {
      return of(local);
    }

    return this.openFoodFacts.search(text).pipe(
      debounceTime(300), //sonst spammt die API zu sehr
      map(apiFoods => {
        const mapped = apiFoods.map(f => this.mapApiFood(f));
        return [...local, ...mapped];
      })
    );
  }

  private mapApiFood(api: any): Food {
    return {
      id: api.code,
      name: api.product_name || 'Unbekannt',
      category: this.mapCategory(api.categories_tags),
      seasonMonths: [],

      imageUrl: api.image_front_url || api.image_url,

      storage: undefined,
      averageShelfLifeDays: undefined,

      previewText: api.brands || undefined,
      description: api.quantity || undefined
    };
  }

  private mapCategory(tags?: string[]): FoodCategory {

    if (!tags) return 'Sonstiges';

    const joined = tags.join(',').toLowerCase();

    if (joined.includes('milk')) return 'Milchprodukte';
    if (joined.includes('cheese')) return 'Milchprodukte';
    if (joined.includes('yogurt')) return 'Milchprodukte';

    if (joined.includes('fruit')) return 'Obst';

    if (joined.includes('vegetable')) return 'Gemüse';

    if (joined.includes('drink') || joined.includes('beverage'))
      return 'Getränke';

    if (joined.includes('bread'))
      return 'Getreide & Backwaren';

    return 'Sonstiges';
  }

  private getLocalFoods(text: string): Food[] {
    return this.foods.filter(f =>
      f.name.toLowerCase().includes(text.toLowerCase())
    );
  }
}