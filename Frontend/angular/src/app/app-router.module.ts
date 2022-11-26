import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductComponent } from 'src/product/product.component';
import { ProductFormComponent } from 'src/product/productForm/productForm.component';
import { ProductListComponent } from 'src/product/productList/productList.component';
import { UnityComponent } from 'src/unity/unity.component';
import { UnityFormComponent } from 'src/unity/unityForm/unityForm.component';
import { UnityListComponent } from 'src/unity/unityList/unityList.component';

const routes: Routes = [
  {
    path: 'unidades',
    component: UnityComponent,
    children: [
      {
        path: '',
        component: UnityListComponent,
        title: 'Lista de unidades - SCV',
      },
      {
        path: 'cadastro',
        component: UnityFormComponent,
        title: 'Cadastro de unidades - SCV',
      },
    ],
  },
  {
    path: 'produtos',
    component: ProductComponent,
    children: [
      {
        path: '',
        component: ProductListComponent,
        title: 'Lista de produtos - SCV',
      },
      {
        path: 'cadastro',
        component: ProductFormComponent,
        title: 'Cadastro de produtos - SCV',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
