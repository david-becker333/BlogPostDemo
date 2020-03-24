import { Observable } from 'rxjs';

// for deactivation
export interface DeactivationGuarded {
    canDeactivate(): Observable<boolean> | Promise<boolean> | boolean;
}

