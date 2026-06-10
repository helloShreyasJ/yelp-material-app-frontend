import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { Component, Inject, OnInit } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatSelect, MatOption } from '@angular/material/select';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { RestaurantDto } from '../../models/restaurant.dto';

@Component({
  selector: 'app-edit-dialog',
  imports: [
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormField,
    MatLabel,
    MatSelect,
    MatOption,
  ],
  templateUrl: './edit-dialog.html',
  styleUrl: './edit-dialog.scss',
})
export class EditDialog implements OnInit {
  editForm!: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<EditDialog>,
    @Inject(MAT_DIALOG_DATA) public data: RestaurantDto,
  ) {}

  ngOnInit(): void {
    this.editForm = new FormGroup({
      id: new FormControl(this.data.id),
      name: new FormControl(this.data.name, [Validators.required]),
      location: new FormControl(this.data.location, [Validators.required]),
      priceRange: new FormControl(this.data.priceRange),
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSaveUpdate(): any {
    if (this.editForm.invalid) return;

    this.dialogRef.close(this.editForm.value);
  }
}
