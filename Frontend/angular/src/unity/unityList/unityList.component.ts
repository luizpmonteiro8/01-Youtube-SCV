import { Component } from '@angular/core';
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
  displayedColumns: string[] = ['id', 'name'];
  unityList: Unity[] = [];
  dataSource: MatTableDataSource<Unity> = new MatTableDataSource<Unity>(
    this.unityList
  );
  pagination: PaginationType | undefined;

  constructor(private unityService: UnityService) {}

  ngOnInit() {
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

  dataSourceValue() {
    this.dataSource = new MatTableDataSource<Unity>(this.unityList);
  }
}
