import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { SharedCommonModule } from './shared-common.module';

@NgModule({
  imports: [SharedCommonModule],
  declarations: [],
  entryComponents: [],
  exports: [SharedCommonModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SharedModule {
  static forRoot() {
    return {
      ngModule: SharedModule
    };
  }
}
