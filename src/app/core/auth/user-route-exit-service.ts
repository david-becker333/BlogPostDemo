import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { Observable } from 'rxjs';
import { PostUpdateComponent } from '../../blog/post-update/post-update.component';

@Injectable({ providedIn: 'root' })
export class UserRouteExitService implements CanDeactivate<PostUpdateComponent> {

    constructor() {
    }

    canDeactivate(
        component: PostUpdateComponent,
    ): boolean | Observable<boolean> | Promise<boolean> {
      return component.canDeactivate ? component.canDeactivate() : true;
    }
}