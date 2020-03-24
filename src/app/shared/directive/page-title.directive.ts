import { Directive, ElementRef } from "@angular/core";
import { ActivatedRouteSnapshot } from '@angular/router';

@Directive({
    selector: '[app-title]'
})
export class PageTitleDirective {

    constructor(
        private elementRef: ElementRef,
        private activatedRouteSnapshot: ActivatedRouteSnapshot
    ) {
       this.activatedRouteSnapshot.data.
       this.elementRef.nativeElement
    }
}