import { Component, ViewChild } from '@angular/core';
import { MatAccordion } from '@angular/material/expansion';
import { Router } from '@angular/router';
import { UnityService } from 'src/api/services/unity.services';

@Component({
  selector: 'menu-root',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
})
export class MenuComponent {
  @ViewChild(MatAccordion)
  accordion!: MatAccordion;

  showFiller = false;

  constructor(private router: Router) {}

  goList(name) {
    switch (name) {
      case 'unity':
        this.router.navigate(['/unidades/']);
        break;
      case 'product':
        this.router.navigate(['/produtos/']);
        break;

      default:
        break;
    }
  }

  goForm(name) {
    switch (name) {
      case 'unity':
        this.router.navigate(['/unidades/cadastro/']);
        break;
      case 'product':
        this.router.navigate(['/produtos/cadastro/']);
        break;

      default:
        break;
    }
  }
}
