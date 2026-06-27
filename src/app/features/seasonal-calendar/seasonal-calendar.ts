import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Food, FoodCategory } from '../../core/models/food';
import { FoodService } from '../../core/services/food-service';

type Season = 'Frühling' | 'Sommer' | 'Herbst' | 'Winter';

interface SeasonInfo {
  name: Season;
  icon: string;
  range: string;
  months: number[]; // January = 0
}

const SEASONS: SeasonInfo[] = [
  { name: 'Frühling', icon: 'local_florist', range: 'März – Mai', months: [2, 3, 4] },
  { name: 'Sommer', icon: 'sunny', range: 'Juni – August', months: [5, 6, 7] },
  { name: 'Herbst', icon: 'eco', range: 'September – November', months: [8, 9, 10] },
  { name: 'Winter', icon: 'ac_unit', range: 'Dezember – Februar', months: [11, 0, 1] },
];

const CATEGORY_ICONS: Record<FoodCategory, string> = {
  'Obst': 'nutrition',
  'Gemüse': 'eco',
  'Salat & Kräuter': 'grass',
  'Milchprodukte': 'water_drop',
  'Getreide & Backwaren': 'bakery_dining',
  'Hülsenfrüchte': 'egg_alt',
  'Nüsse & Samen': 'scatter_plot',
  'Fleisch & Wurst': 'kebab_dining',
  'Fisch & Meeresfrüchte': 'set_meal',
  'Eier': 'egg',
  'Getränke': 'local_cafe',
  'Sonstiges': 'category',
};

@Component({
  selector: 'app-seasonal-calendar',
  imports: [CommonModule],
  templateUrl: './seasonal-calendar.html',
  styleUrl: './seasonal-calendar.scss',
})
export class SeasonalCalendar implements OnInit {
  monthNames: string[] = [
    'Januar', 'Februar', 'März', 'April', 'Mai', 'Juni',
    'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember',
  ];

  seasons = SEASONS;
  currentSeasonIndex = 1; // Start: Sommer

  categories: FoodCategory[] = [
    'Obst', 'Gemüse', 'Salat & Kräuter', 'Milchprodukte',
    'Getreide & Backwaren', 'Hülsenfrüchte', 'Nüsse & Samen',
    'Fleisch & Wurst', 'Fisch & Meeresfrüchte', 'Eier', 'Getränke', 'Sonstiges',
  ];

  activeCategories = new Set<FoodCategory>(this.categories);

  foods: Food[] = [];

  constructor(private foodService: FoodService) {}

  ngOnInit(): void {
    this.foods = this.foodService.getFoods(); // ← kein subscribe, direkter Rückgabewert
  }

  get currentSeason(): SeasonInfo {
    return this.seasons[this.currentSeasonIndex];
  }

  chooseSeason(index: number) {
    this.currentSeasonIndex = index;
  }

  lastSeason() {
    this.currentSeasonIndex = (this.currentSeasonIndex + 3) % this.seasons.length;
  }

  nextSeason() {
    this.currentSeasonIndex = (this.currentSeasonIndex + 1) % this.seasons.length;
  }

  toggleCategory(category: FoodCategory) {
    this.activeCategories.has(category)
      ? this.activeCategories.delete(category)
      : this.activeCategories.add(category);
  }

  icon(category: FoodCategory): string {
    return CATEGORY_ICONS[category];
  }

  itemsFor(category: FoodCategory, monthIndexInSeason: number): Food[] {
    const month = this.currentSeason.months[monthIndexInSeason];
    return this.foods.filter(
      (f) => f.category === category && f.seasonMonths.includes(month)
    );
  }

  get visibleCategories(): FoodCategory[] {
    return this.categories.filter((category) => {
      if (!this.activeCategories.has(category)) return false;
      return [0, 1, 2].some((i) => this.itemsFor(category, i).length > 0);
    });
  }

  monthName(monthIndexInSeason: number): string {
    const month = this.currentSeason.months[monthIndexInSeason];
    return this.monthNames[month];
  }
}

