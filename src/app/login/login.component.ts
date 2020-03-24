import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { LoginService } from '../core/login/login.service';
import { Credentials } from '../shared/model/user.model'
import { Router } from '@angular/router';

import { Store } from '@ngrx/store';
import { IState } from '../store/state';
import { selectUser } from '../store/state/user.state';
import { take, debounceTime } from 'rxjs/operators';
import { Subject } from 'rxjs';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  error: string = '';

  loginForm: FormGroup;

  validateUsername;

  errorStatus: boolean;

  errors = new Subject<string>();


  constructor(
    private fb: FormBuilder,
    private loginService: LoginService,
    private router: Router,
    private store: Store<IState>
  ) {
  }

  ngOnInit() {
    this.generateLoginForm();

    
  }

  generateLoginForm() {
    this.loginForm = this.fb.group({
      username: new FormControl('Bret', [Validators.required])
    })
  }

  showErrorMessage(msg, status) {
    this.error = msg;
    this.errorStatus = status;
  }

  login() {
    const credentials: Credentials = {
      username: this.loginForm.get('username').value
    }

    this.loginService.login(credentials, (status) => {
      if (!status) {
        this.router.navigate(['/home']);
      } else {
        this.showErrorMessage('Not a valid user name.', true);
      }
    });
  }

}
