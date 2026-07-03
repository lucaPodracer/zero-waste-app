export interface Food {
    id: number|string;
    name: string;
    category: FoodCategory;
    seasonMonths: number[]; //Januar = 0

  storage?: string;
  averageShelfLifeDays?: number;
  imageUrl?: string;

  description?: string;
  zeroWasteTips?: string[];
  uses?: string[];

  previewText?: string;
}

export type FoodCategory =
    | 'Obst'
    | 'Gemüse'
    | 'Salat & Kräuter'
    | 'Milchprodukte'
    | 'Getreide & Backwaren'
    | 'Hülsenfrüchte'
    | 'Nüsse & Samen'
    | 'Fleisch & Wurst'
    | 'Fisch & Meeresfrüchte'
    | 'Eier'
    | 'Getränke'
    | 'Sonstiges';
