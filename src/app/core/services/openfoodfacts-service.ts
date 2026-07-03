import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class OpenFoodFactsService {
  private http = inject(HttpClient);

  getProduct(barcode: string): Observable<any> {
    return this.http.get(
      `https://world.openfoodfacts.net/api/v3.6/product/${barcode}.json`
    );
  }
  
  search(query: string): Observable<any[]> {
  return this.http.get<any>(
    `https://world.openfoodfacts.net/cgi/search.pl?search_terms=${query}&search_simple=1&json=1`
  ).pipe(
    map(res => res.products ?? [])
  );
}
}