import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RestaurantDto } from '../models/restaurant.dto'; 

@Injectable({
  providedIn: 'root'
})
export class RestaurantsService {
  private readonly apiUrl = 'http://localhost:8080/api/restaurants';
  
  constructor(private httpClient: HttpClient) {}

  getRestaurantsData(): Observable<RestaurantDto[]> {
    return this.httpClient.get<RestaurantDto[]>(this.apiUrl);
  }

  createRestaurant(restaurant: RestaurantDto): Observable<RestaurantDto> {
    return this.httpClient.post<RestaurantDto>(`${this.apiUrl}/create`, restaurant);
  }

  updateRestaurant(id: number, restaurant: RestaurantDto): Observable<RestaurantDto> {
    return this.httpClient.put<RestaurantDto>(`${this.apiUrl}/${id}/update`, restaurant);
  }

  deleteRestaurant(id: number): Observable<RestaurantDto[]> {
    return this.httpClient.delete<RestaurantDto[]>(`${this.apiUrl}/${id}/delete`);
  }
}