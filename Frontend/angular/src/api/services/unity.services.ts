import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PaginationType } from '../models/pagination';
import { Unity } from '../models/unity';

type PageReturn = {
  results: Unity[];
  pagination: PaginationType;
};
@Injectable()
export class UnityService {
  private readonly PATH: string = '/unity';

  constructor(private http: HttpClient) {}

  getUnityPage(
    page = 0,
    size = 25,
    search = '',
    order = 'asc',
    sort = 'id'
  ): Observable<PageReturn> {
    return this.http.get<PageReturn>(
      environment.baseUrl +
        this.PATH +
        `/pages?page=${page}&size=${size}&search=${search}&order=${order}&sort=${sort}`
    );
  }
  getUnityById(id: number): Observable<Unity> {
    return this.http.get<Unity>(environment.baseUrl + this.PATH + `/${id}`);
  }
  insert(unity: Unity): Observable<Unity> {
    return this.http.post<Unity>(environment.baseUrl + this.PATH, unity);
  }
  update(unity: Unity): Observable<Unity> {
    return this.http.patch<Unity>(
      environment.baseUrl + this.PATH + '/' + unity.id,
      unity
    );
  }
  remove(id: number): Observable<void> {
    return this.http.delete<void>(environment.baseUrl + this.PATH + `/${id}`);
  }
}
