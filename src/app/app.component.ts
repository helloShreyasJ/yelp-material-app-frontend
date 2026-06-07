import { AfterViewInit, Component, signal } from '@angular/core';
import { MatFormField, MatLabel, MatFormFieldModule } from '@angular/material/form-field';
import {MatSelect, MatOption ,MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { RestaurantDto } from './restaurant.dto';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RestaurantsService } from './services/restaurant.service';

@Component({
  selector: 'app-root',
  imports: [ ReactiveFormsModule, MatFormField, MatLabel, MatOption, MatSelect, MatFormFieldModule, MatInputModule, MatSelectModule, MatButtonModule, MatIconModule, MatTableModule],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})

export class App implements AfterViewInit {
  displayedColumns: string[] = ['name', 'location', 'priceRange', 'rating', 'actions'];
  restaurants = signal<RestaurantDto[]>([])

  constructor(private service: RestaurantsService) {}

  /* Form validation*/
  restaurantForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    location: new FormControl('', [Validators.required]),
    priceRange: new FormControl<number>(2)
  });

  ngAfterViewInit() {
    this.fetchInitialData();
  }
  
  fetchInitialData = async () => {
    this.service.getRestaurantsData().subscribe(async (data) => {
      this.restaurants.set(data);
      console.log(this.restaurants);
    });
  }
  
  executeAddRestaurantCommand = () => {
    // TODO
  }
}