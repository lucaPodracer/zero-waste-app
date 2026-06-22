import { Routes } from '@angular/router';
import { Home } from './features/home/home';
import { SeasonalCalendar } from './features/seasonal-calendar/seasonal-calendar';
import { FoodList } from './features/food-list/food-list';
import { FoodDetails } from './features/food-details/food-details';
import { Pantry } from './features/pantry/pantry';

export const routes: Routes = [
    { path: '', component: Home },
    { path: 'seasonal-calendar', component: SeasonalCalendar },
    { path: 'food-list', component: FoodList },
    { path: 'food-details/:id', component: FoodDetails },
    { path: 'pantry', component: Pantry}
];
