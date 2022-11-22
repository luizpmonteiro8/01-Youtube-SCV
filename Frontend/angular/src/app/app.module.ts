import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MenuModule } from 'src/menu/menu.module';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UnityListModule } from 'src/unity/unityList/unityList.module';
import { UnityService } from 'src/api/services/unity.services';
import { HttpClientModule } from '@angular/common/http';
import { UnityFormModule } from 'src/unity/unityForm/unityForm.module';

@NgModule({
  declarations: [AppComponent],
  providers: [UnityService],
  bootstrap: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MenuModule,
    UnityListModule,
    UnityFormModule,
  ],
})
export class AppModule {}
