import { Food } from "./food";

export interface PantryItem {
    id: string;
    food: Food;
    restockDate: Date;
    quantity?: number;
    unit?: QuantityUnit;
    expiryDate?: Date;
    opened?: boolean //optional für später: Packung öffnen, Frucht anschneiden etc.
    notes?: string;
}

export type QuantityUnit =
    | 'g'
    | 'kg'
    | 'ml'
    | 'l'
    | 'Stück';