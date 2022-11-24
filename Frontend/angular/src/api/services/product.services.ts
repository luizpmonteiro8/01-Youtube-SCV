import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PaginationType } from '../models/pagination';
import { Product } from '../models/product';

type PageReturn = {
  results: Product[];
  pagination: PaginationType;
};
@Injectable()
export class ProductService {
  private readonly PATH: string = '/product';

  constructor(private http: HttpClient) {}

  getProductPage(
    page = 0,
    size = 25,
    search = '',
    order = 'asc',
    sort = 'name'
  ): Observable<PageReturn> {
    return this.http.get<PageReturn>(
      environment.baseUrl +
        this.PATH +
        `/pages?page=${page}&size=${size}&search=${search}&order=${order}&sort=${sort}`
    );
  }
  getProductById(id: number): Observable<Product> {
    return this.http.get<Product>(environment.baseUrl + this.PATH + `/${id}`);
  }
  insert(product: Product): Observable<Product> {
    return this.http.post<Product>(environment.baseUrl + this.PATH, product);
  }
  update(product: Product): Observable<Product> {
    return this.http.patch<Product>(
      environment.baseUrl + this.PATH + '/' + product.id,
      product
    );
  }
  remove(id: number): Observable<void> {
    return this.http.delete<void>(environment.baseUrl + this.PATH + `/${id}`);
  }
}
