import { Component, ViewChild, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { PaginationType } from 'src/api/models/pagination';
import { Unity } from 'src/api/models/unity';
import { UnityService } from 'src/api/services/unity.services';

@Component({
  selector: 'unityList-root',
  templateUrl: './unityList.component.html',
  styleUrls: ['./unityList.component.css'],
})
export class UnityListComponent {
  displayedColumns: string[] = ['id', 'name', 'action'];
  unityList: Unity[] = [];
  pagination: PaginationType = {
    length: 0,
    size: 0,
    lastPage: 0,
    page: 0,
    startIndex: 0,
    endIndex: 0,
  };
  dataSource: MatTableDataSource<Unity>;

  page = 0;
  size = 25;
  search = '';
  order = 'asc';
  sort = 'id';

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(
    private unityService: UnityService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.paginator._intl.itemsPerPageLabel = 'Itens por página:';
    this.paginator._intl.nextPageLabel = 'Próxima';
    this.paginator._intl.previousPageLabel = 'Anterior';
    this.paginator._intl.firstPageLabel = 'Primeira página';
    this.paginator._intl.lastPageLabel = 'Última página';
    this.paginator._intl.getRangeLabel = this.getDisplayText;

    this.unityService.getUnityPage().subscribe({
      next: (resp) => {
        this.unityList = resp.results;
        this.pagination = resp.pagination;
        this.dataSourceValue();
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  getDisplayText(page: number, pageSize: number, length: number) {
    if (length == 0 || pageSize == 0) {
      return 'Sem resultados.';
    }
    const startIndex = page * pageSize;
    const endIndex =
      startIndex < length
        ? Math.min(startIndex + pageSize, length)
        : startIndex + pageSize;
    return `Itens: ${startIndex + 1} - ${endIndex} Página: ${
      page + 1
    } de ${Math.ceil(length / pageSize)}, total:${length} itens`;
  }

  dataSourceValue() {
    this.dataSource = new MatTableDataSource<Unity>(this.unityList);
  }

  handlePageEvent(event: any) {
    this.unityService
      .getUnityPage(
        event.pageIndex,
        this.size,
        this.search,
        this.order,
        this.sort
      )
      .subscribe({
        next: (resp) => {
          this.unityList = resp.results;
          this.pagination = resp.pagination;
          this.dataSourceValue();
        },
        error: (error) => {
          console.log(error);
        },
      });
  }

  onChangeInput(e: any) {
    this.search = e.target.value;

    this.unityService
      .getUnityPage(0, this.size, this.search, this.order, this.sort)
      .subscribe({
        next: (resp) => {
          this.unityList = resp.results;
          this.pagination = resp.pagination;
          this.dataSourceValue();
        },
        error: (error) => {
          console.log(error);
        },
      });
  }

  openDialog(e) {
    console.log(e);

    const dialog = this.dialog.open(DialogRemove, {
      data: { id: e.id, name: e.name },
    });
    dialog.afterClosed().subscribe((remove) => {
      if (remove) {
        this.removeUnity(e.id);
      }
    });
  }

  removeUnity(unityId) {
    this.unityService.remove(unityId).subscribe({
      next: (_) => {
        this.unityList = this.unityList.filter((item) => item.id != unityId);
        this.pagination.length = this.pagination.length - 1;
        this.dataSourceValue();
        this.snackBar.open('Removido com sucesso.', 'Sucesso', {
          duration: 3000,
        });
      },
      error: (error) => {
        if (error.error.message) {
          this.snackBar.open(error.error.message, 'Error', {
            duration: 50000,
          });
        } else {
          this.snackBar.open('Ocorreu um erro inesperado.', 'Error', {
            duration: 3000,
          });
        }
      },
    });
  }
}

@Component({
  selector: 'dialog-remove',
  template: ` <div class="dialog-container">
    <div class="dialog-container-title">
      <h1 mat-dialog-title class="dialog-title">Remover unidade</h1>
    </div>
    <div mat-dialog-content class="dialog-message">
      Gostaria de remover unidade de nome: {{ data.name }} com id:
      {{ data.id }}?
    </div>
    <div mat-dialog-actions>
      <button mat-button [mat-dialog-close]="false">Cancelar</button>
      <button mat-button [mat-dialog-close]="true" cdkFocusInitial color="warn">
        Remover
      </button>
    </div>
  </div>`,
  styleUrls: ['./unityList.component.css'],
})
export class DialogRemove {
  constructor(@Inject(MAT_DIALOG_DATA) public data: Unity) {}
}
