import { Component, inject, OnInit, signal } from '@angular/core';
import { MatFormField, MatLabel, MatFormFieldModule } from '@angular/material/form-field';
import { MatSelect, MatOption, MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { RestaurantDto } from './restaurant.dto';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RestaurantsService } from './services/restaurant.service';
import { MatMenuModule } from '@angular/material/menu';
import { EditDialog } from './edit-dialog/edit-dialog';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-root',
  imports: [
    MatButtonModule,
    MatMenuModule,
    ReactiveFormsModule,
    MatFormField,
    MatLabel,
    MatOption,
    MatSelect,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App implements OnInit {
  displayedColumns: string[] = ['name', 'location', 'priceRange', 'rating', 'actions'];
  restaurants = signal<RestaurantDto[]>([]);
  restaurantForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    location: new FormControl('', [Validators.required]),
    priceRange: new FormControl<number>(2),
  });
  private dialog = inject(MatDialog);
  constructor(private service: RestaurantsService) {}

  ngOnInit() {
    this.fetchRestaurants();
  }

  fetchRestaurants = async () => {
    this.service.getRestaurantsData().subscribe(async (data) => {
      this.restaurants.set(data);
      console.log(this.restaurants);
    });
  };

  addRestaurant = () => {
    if (this.restaurantForm.invalid) return;

    let formValues = this.restaurantForm.value;

    let r: RestaurantDto = {
      name: formValues.name ?? '',
      location: formValues.location ?? '',
      priceRange: formValues.priceRange ?? 2,
    };

    this.service.createRestaurant(r).subscribe({
      next: (savedRestaurant) => {
        this.restaurants.update((currentList) => [...currentList, savedRestaurant]);
        this.restaurantForm.reset({ priceRange: 2 });
      },
      error: (err) => {
        console.error('Failed to add restaurant:', err);
      },
    });
  };

  openEditModal(restaurantRow: RestaurantDto) {
    const dialogRef = this.dialog.open(EditDialog, {
      width: '350px',
      data: restaurantRow, // FIX: Pass the row data into the dialog
    });

    dialogRef.afterClosed().subscribe((updatedRestaurant) => {
      if (updatedRestaurant.id == undefined) return;

      this.service.updateRestaurant(updatedRestaurant.id, updatedRestaurant).subscribe({
          next: (savedRestaurant) => {
            this.restaurants.update((currentList) =>
              currentList.map((r) => (r.id === savedRestaurant.id ? savedRestaurant : r)),
            );
          },
          error: (err) => console.error('Failed to update:', err),
        });
    });
  }

  deleteEntry() {
    throw new Error('Method not implemented.');
  }
}
