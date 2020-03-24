import { NgModule } from '@angular/core';
import { DatePipe } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgbDateAdapter } from '@ng-bootstrap/ng-bootstrap';
import { NgbDateMomentAdapter } from '../shared/util/datepicker-adapter';


@NgModule({
  imports: [HttpClientModule],
  exports: [],
  declarations: [],
  providers: [
    { provide: NgbDateAdapter, useClass: NgbDateMomentAdapter },
    DatePipe
  ]
})
export class CoreModule {
  constructor() {
  }
}
