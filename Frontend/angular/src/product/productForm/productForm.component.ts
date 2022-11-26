import {
  Component,
  ElementRef,
  EventEmitter,
  Output,
  ViewChild,
} from '@angular/core';
import {
  MatAutocomplete,
  MatAutocompleteTrigger,
} from '@angular/material/autocomplete';
import { MatSelect } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { fromEvent, map, takeUntil } from 'rxjs';
import { Unity } from 'src/api/models/unity';
import { ProductService } from 'src/api/services/product.services';
import { UnityService } from 'src/api/services/unity.services';
import {
  convertAmericanFromBrazil,
  convertBraziltoAmerican,
  formatNumberInScreen,
} from 'src/common/util/formatNumber';

@Component({
  selector: 'productForm-root',
  templateUrl: './productForm.component.html',
  styleUrls: ['./productForm.component.css'],
})
export class ProductFormComponent {
  touched = false;
  id: Number = null;
  name: string = '';
  priceSale: string = '';
  unityId: Number = null;
  unitySelected: Unity;

  unityList: Unity[] = [];

  //page
  page = 0;
  size = 25;
  search = '';
  order = 'asc';
  sort = 'id';
  lastPage = null;

  @ViewChild('autoCompleteInput') autocompleteRef: MatAutocomplete;
  @ViewChild(MatAutocompleteTrigger)
  autoCompleteTrigger: MatAutocompleteTrigger;

  constructor(
    private productService: ProductService,
    private unityService: UnityService,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    const { id } = this.route.snapshot.params;

    if (id) {
      this.productService.getProductById(id).subscribe({
        next: (resp) => {
          this.id = resp.id;
          this.name = resp.name;
          this.priceSale = convertAmericanFromBrazil(resp.priceSale);
          this.unitySelected = resp.unity;
          this.unityId = resp.unityId;
          this.search = resp.unity.name;
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

    this.unityService
      .getUnityPage(this.page, this.size, this.search, this.order, this.sort)
      .subscribe({
        next: (resp) => {
          this.unityList = resp.results;
          this.lastPage = resp.pagination.lastPage;
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

  onScroll(event) {
    if (
      Math.round(event.target.scrollTop + event.target.clientHeight) ===
        event.target.scrollHeight &&
      event.target.scrollHeight != 0
    ) {
    }
  }

  onChangeName(e) {
    this.name = e.target.value;
  }

  onChangePriceSale(e) {
    this.priceSale = formatNumberInScreen(e.target.value);
  }

  onChangeUnity(e) {
    const nameUnity = e.option.value;
    const unity = this.unityList.filter((item) => item.name == nameUnity);

    this.unityId = unity[0].id;
  }

  onChangeSearch(e) {
    this.search = e.target.value;
    this.onSearch();
  }

  onLoadMoreUnity() {
    this.page += 1;
    if (this.page <= this.lastPage) {
      this.unityService
        .getUnityPage(this.page, this.size, this.search, this.order, this.sort)
        .subscribe({
          next: (resp) => {
            this.unityList = this.unityList.concat(resp.results);
            this.lastPage = resp.pagination.lastPage;
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

  onSearch() {
    this.page = 0;
    this.unityService
      .getUnityPage(this.page, this.size, this.search, this.order, this.sort)
      .subscribe({
        next: (resp) => {
          this.unityList = resp.results;
          this.lastPage = resp.pagination.lastPage;
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

  autocompleteScroll() {
    this.search = '';
    setTimeout(() => {
      if (
        this.autocompleteRef &&
        this.autoCompleteTrigger &&
        this.autocompleteRef.panel
      ) {
        fromEvent(this.autocompleteRef.panel.nativeElement, 'scroll')
          .pipe(
            map((x) => this.autocompleteRef.panel.nativeElement.scrollTop),
            takeUntil(this.autoCompleteTrigger.panelClosingActions)
          )
          .subscribe((x) => {
            const scrollTop =
              this.autocompleteRef.panel.nativeElement.scrollTop;
            const scrollHeight =
              this.autocompleteRef.panel.nativeElement.scrollHeight;
            const elementHeight =
              this.autocompleteRef.panel.nativeElement.clientHeight;
            const atBottom = scrollHeight === scrollTop + elementHeight;

            if (atBottom) {
              this.onLoadMoreUnity();
            }
          });
      }
    });
  }

  onSubmit(e) {
    e.preventDefault();
    this.touched = true;

    if (
      this.priceSale != '' &&
      this.name != '' &&
      Number(this.unityId) > 0 &&
      this.id == null
    ) {
      this.productService
        .insert({
          name: this.name,
          priceSale: convertBraziltoAmerican(this.priceSale),
          unityId: this.unityId,
        })
        .subscribe({
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
    } else if (
      this.priceSale != '' &&
      this.name != '' &&
      Number(this.unityId) > 0 &&
      Number(this.id) > 0
    ) {
      this.productService
        .update({
          id: this.id,
          name: this.name,
          priceSale: convertBraziltoAmerican(this.priceSale),
          unityId: this.unityId,
        })
        .subscribe({
          next: (resp) => {
            this.snackBar.open(`Alterado com sucesso. `, 'Sucesso', {
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
    this.priceSale = '';
    this.unityId = null;
    this.search = '';
  }
}
