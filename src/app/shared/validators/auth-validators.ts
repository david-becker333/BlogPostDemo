import { Directive, forwardRef } from '@angular/core';
import { NG_VALIDATORS, FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import { IState } from '../../store/state';
import { selectUser } from '../../store/state/user.state';
import { take } from 'rxjs/operators';

export const validateUsernameFactory = (store: Store<IState>) => {
    return (c: FormControl) => {
        store.select(selectUser(c.value)).pipe(
            take(1)
        ).subscribe(user => {
            return user ? null : {
                validateUsername: {
                    valid: false
                }
            }
        }, error => {
            return {
                validateUsername: {
                    valid: false
                }
            }
        })
    };
}

@Directive({
    selector: '[validateUsername][ngModel],[validateUsername][formControl],[validateUsername][formControlName]',
    providers: [
        { provide: NG_VALIDATORS, useExisting: forwardRef(() => UsernameValidator), multi: true }
    ]
})
export class UsernameValidator {

    validator: Function;

    constructor(private store: Store<IState>) {
        this.validator = validateUsernameFactory(store);
    }

    validate(c: FormControl) {
        return this.validator(c);
    }
}