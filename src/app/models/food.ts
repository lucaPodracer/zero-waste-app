export interface Food {
    id: number;
    name: string;
    category: FoodCategory;
    seasonMonths: number[];

    storage?: string;
    averageShelfLifeDays?: number;
    imageUrl?: string;
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
