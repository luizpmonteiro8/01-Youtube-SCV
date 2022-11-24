import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MenuModule } from 'src/menu/menu.module';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UnityListModule } from 'src/unity/unityList/unityList.module';
import { UnityService } from 'src/api/services/unity.services';
import { HttpClientModule } from '@angular/common/http';
import { UnityFormModule } from 'src/unity/unityForm/unityForm.module';
import { AppRoutingModule } from './app-router.module';
import { UnityComponent } from 'src/unity/unity.component';
import { UnityModule } from 'src/unity/unity.module';
import { ProductModule } from 'src/product/product.module';
import { ProductService } from 'src/api/services/product.services';

@NgModule({
  declarations: [AppComponent],
  providers: [UnityService, ProductService],
  bootstrap: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MenuModule,
    UnityModule,
    ProductModule,
    AppRoutingModule,
  ],
})
export class AppModule {}
