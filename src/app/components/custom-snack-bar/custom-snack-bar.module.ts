import { MatIconModule } from '@angular/material/icon';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomSnackBarComponent } from './custom-snack-bar.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({
  declarations: [CustomSnackBarComponent],
  imports: [CommonModule, MatIconModule, MatSnackBarModule],
  exports: [CustomSnackBarComponent],
})
export class CustomSnackBarModule {}
