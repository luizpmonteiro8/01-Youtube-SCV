import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { AppRoutingModule } from 'src/app/app-router.module';
import { UnityComponent } from './unity.component';

import { UnityFormModule } from './unityForm/unityForm.module';
import { UnityListModule } from './unityList/unityList.module';

@NgModule({
  declarations: [UnityComponent],
  providers: [],
  imports: [UnityListModule, UnityFormModule, AppRoutingModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [UnityComponent],
})
export class UnityModule {}
