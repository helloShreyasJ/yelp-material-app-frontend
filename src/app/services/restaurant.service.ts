import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RestaurantDto } from '../restaurant.dto'; 

@Injectable({
  providedIn: 'root'
})
export class RestaurantsService {
  private readonly apiUrl = 'http://localhost:8080/api/restaurants';
  
  constructor(private httpClient: HttpClient) {}

  getRestaurantsData(): Observable<RestaurantDto[]> {
    return this.httpClient.get<RestaurantDto[]>(this.apiUrl);
  }
}