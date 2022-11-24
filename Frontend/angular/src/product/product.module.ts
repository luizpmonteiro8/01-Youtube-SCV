import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { AppRoutingModule } from 'src/app/app-router.module';
import { ProductComponent } from './product.component';

import { ProductFormModule } from './productForm/productForm.module';
import { ProductListModule } from './productList/productList.module';

@NgModule({
  declarations: [ProductComponent],
  providers: [],
  imports: [ProductListModule, ProductFormModule, AppRoutingModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [ProductComponent],
})
export class ProductModule {}
