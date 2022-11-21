import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {AuthError} from "../interfaces/AuthError";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

  loading: boolean = false;
  error: AuthError | undefined;

  loginForm = new FormGroup({
    userName: new FormControl('', [Validators.required, Validators.maxLength(16)]),
    password: new FormControl('', [Validators.required]),
  });

  constructor(public http: HttpClient, @Inject('BASE_URL') public baseUrl: string, private router: Router) { }

  ngOnInit(): void {
  }

  login(): void {
    if (this.loginForm.valid) {
      const data = this.loginForm.value;
      this.loading = true;

      this.http.post<any>(this.baseUrl + 'api/auth/login', data).subscribe(result => {
        this.loading = false;
        this.router.navigate(["/"]);
      }, (error: AuthError) => {
          console.log(error)
          this.error = error;
          this.loading = false;
      });
    }
  }

  getErrorMessage(control: AbstractControl) {
    if (control.hasError('required')) {
      return 'You must enter a value';
    }

    return control.hasError('email') ? 'Not a valid email' : '';
  }

}
