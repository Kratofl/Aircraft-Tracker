import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html'
})
export class RegisterComponent implements OnInit {

  loading: boolean = false;

  registerForm = new FormGroup({
    userName: new FormControl('', [Validators.required, Validators.maxLength(16)]),
    password: new FormControl('', [Validators.required]),
  });

  constructor(public http: HttpClient, @Inject('BASE_URL') public baseUrl: string, private router: Router) { }

  ngOnInit(): void {
  }

  register(): void {
    if (this.registerForm.valid) {
      const data = this.registerForm.value;
      this.loading = true;

      this.http.post<any>(this.baseUrl + 'api/auth/register', data).subscribe(result => {
        this.loading = false;
        this.router.navigate(["/"]);
      }, error => console.log(error));
    }
  }

  getErrorMessage(control: AbstractControl) {
    if (control.hasError('required')) {
      return 'You must enter a value';
    }

    return control.hasError('email') ? 'Not a valid email' : '';
  }

}
