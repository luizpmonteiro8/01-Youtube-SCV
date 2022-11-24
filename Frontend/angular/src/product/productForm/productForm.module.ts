import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ProductFormComponent } from './productForm.component';

@NgModule({
  declarations: [ProductFormComponent],
  providers: [],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatSnackBarModule,
    MatButtonModule,
    MatAutocompleteModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [ProductFormComponent],
})
export class ProductFormModule {}
