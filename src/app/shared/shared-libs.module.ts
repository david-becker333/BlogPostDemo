import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule, NgbModalModule, NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

const importExports = [
  NgbModule, 
  RouterModule,
  ReactiveFormsModule,
  HttpClientModule,
  FormsModule,
  ReactiveFormsModule,
  FontAwesomeModule,
  NgbModule,
  NgbModalModule,
  NgbAlertModule,
];

@NgModule({
  imports: [
    ...importExports
  ],
  exports: [
    CommonModule,
    ...importExports
  ]
})
export class SharedLibsModule {
  static forRoot() {
    return {
      ngModule: SharedLibsModule
    };
  }
}
