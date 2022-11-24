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
      },
      {
        path: 'cadastro',
        component: UnityFormComponent,
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
      },
      {
        path: 'cadastro',
        component: ProductFormComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
