import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html'
})
export class LogoutComponent implements OnInit {

  constructor(public http: HttpClient, @Inject('BASE_URL') public baseUrl: string, private router: Router) { }

  ngOnInit(): void {
    this.http.get<any>(this.baseUrl + 'api/auth/logout').subscribe(result => {
      this.router.navigate(["/"]);
    }, error => console.log(error));
  }

}
