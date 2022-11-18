import { Component, ViewChild } from '@angular/core';
import { MatAccordion } from '@angular/material/expansion';
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
}
