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
import { ReactiveFormsModule } from '@angular/forms';
ReactiveFormsModule

@Component({
  selector: 'app-root',
  imports: [ MatFormField, MatLabel, MatOption, MatSelect, MatFormFieldModule, MatInputModule, MatSelectModule, MatButtonModule, MatIconModule, MatTableModule],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  displayedColumns: string[] = ['name', 'location', 'priceRange', 'rating', 'actions'];
  restaurantsList = signal<Restaurant[]>([]);
}
