import { Injectable } from '@angular/core';
import { Food } from '../models/food';
import foodsData from '../data/foods.json';

@Injectable({
  providedIn: 'root',
})
export class FoodService {

  private foods: Food[] = foodsData as Food[];

  //GETTER

  getFoods(): Food[] {
    return this.foods;
  }

  getFoodById(id: number): Food | undefined { //falls nicht vorhanden => undefined (für Entwickler simpler und effektiver Hinweis)
    return this.foods.find(food => food.id === id);
  }

  getFoodBySeason(month: number): Food[] {
    return this.foods.filter(food => food.seasonMonths.includes(month))
  }

  //SUCHE und FILTER

  searchForFood(search: string): Food[] {
    return this.foods.filter(food => food.name.toLowerCase().includes(search.trim().toLowerCase())) //trim für Leerzeichen & immer auf toLowerCase achten
  }
}
