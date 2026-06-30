import { Component } from '@angular/core';

@Component({
  selector: 'app-seasonal-calendar',
  imports: [],
  templateUrl: './seasonal-calendar.html',
  styleUrl: './seasonal-calendar.scss',
})
export class SeasonalCalendar {
  year: number = 2026;
  monthNames: string[] = [
    'Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'
  ];
  currentMonthIndex: number = 5;

  get currentMonthName(): string{
    return this.monthNames[this.currentMonthIndex];
    }

     nextMonth() {
    if (this.currentMonthIndex === 11) {
      // war Dezember → springe zu Januar nächstes Jahr
      this.currentMonthIndex = 0;
      this.year++;
    } else {
      this.currentMonthIndex++;
    }
  }

  previousMonth() {
    if (this.currentMonthIndex === 0) {
      // war Januar → springe zu Dezember letztes Jahr
      this.currentMonthIndex = 11;
      this.year--;
    } else {
      this.currentMonthIndex--;
    }
  
  }
}
