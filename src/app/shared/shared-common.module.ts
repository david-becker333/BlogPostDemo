import { NgModule } from '@angular/core';

import { SharedLibsModule } from './shared-libs.module';
import { PaginationComponent } from './component/pagination/pagination.component';
import { UsernameValidator } from './validators/auth-validators';

const importExports = [
  PaginationComponent,
  UsernameValidator
];
@NgModule({
  imports: [SharedLibsModule],
  declarations: [...importExports],
  exports: [SharedLibsModule, ...importExports]
})
export class SharedCommonModule {}
