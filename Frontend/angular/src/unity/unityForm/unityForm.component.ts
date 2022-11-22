import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UnityService } from 'src/api/services/unity.services';

@Component({
  selector: 'unityForm-root',
  templateUrl: './unityForm.component.html',
  styleUrls: ['./unityForm.component.css'],
})
export class UnityFormComponent {
  touched = false;
  id: Number = null;
  name: string = '';

  constructor(
    private unityService: UnityService,
    private snackBar: MatSnackBar
  ) {}

  onChangeName(e) {
    this.name = e.target.value;
  }

  onSubmit(e) {
    e.preventDefault();
    this.touched = true;

    if (this.name != '' && this.id == null) {
      this.unityService.insert({ name: this.name }).subscribe({
        next: (resp) => {
          this.snackBar.open(`Salvo com id:${resp.id}. `, 'Sucesso', {
            duration: 3000,
          });
        },
        error: (error) => {
          if (error.error.message) {
            this.snackBar.open(`${error.error.message}`, 'Error', {
              duration: 3000,
            });
          } else {
            this.snackBar.open(`Ocorreu um erro inesperado.`, 'Error', {
              duration: 3000,
            });
          }
        },
      });
    }
  }

  reset() {
    this.touched = false;
    this.id = null;
    this.name = '';
  }
}
