import { Component, signal } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatSelect, MatOption } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { Restaurant } from './restaurant.model';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  imports: [ ReactiveFormsModule, MatFormField, MatLabel, MatOption, MatSelect, MatFormFieldModule, MatInputModule, MatSelectModule, MatButtonModule, MatIconModule, MatTableModule],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  displayedColumns: string[] = ['name', 'location', 'priceRange', 'rating', 'actions'];
  restaurantsList = signal<Restaurant[]>([]);

  /* Test cases */
  // restaurantsList = signal<Restaurant[]>([
  //   { name: 'McDonaghs', location: 'Galway', priceRange: '$$', rating: 5 },
  //   { name: 'Apache Pizza', location: 'Galway', priceRange: '$$', rating: 0 }
  // ]);

  /* Form validation*/
  restaurantForm = new FormGroup({
    name: new FormControl('', [
      Validators.required,
    ]),
  
    location: new FormControl('', [
      Validators.required,
    ]),
  
    priceRange: new FormControl('$$')
  });

  /**
   * Translates a numeric rating score into a 5 slot boolean array
   * 
   * @param ratingScore restaurant score between 0 and 5
   * @returns array containing 5 elements (true = filled star, false = empty star)
   */
  generateStarBlueprint(ratingScore: number): boolean[] {
    const starBlueprintList: boolean[] = [];
    for (let currentStarIndex = 0; currentStarIndex < 5; currentStarIndex++) {
        if (currentStarIndex < ratingScore) {
          starBlueprintList.push(true);
        } else {
          starBlueprintList.push(false);
        }
    }

    return starBlueprintList;
  }

  /**
   * Executed when add button is clicked
   */
  executeAddRestaurantCommand() {
    if (this.restaurantForm.valid) {
      const formValues = this.restaurantForm.value;
      
      const freshNewRestaurant: Restaurant = {
        name: formValues.name ?? '',
        location: formValues.location ?? '',
        priceRange: formValues.priceRange ?? '$$',
        rating: 0
      };

      this.restaurantsList.update(currentList => [...currentList, freshNewRestaurant]);
      this.restaurantForm.reset({ priceRange: '$$' });
    }
  }
}
