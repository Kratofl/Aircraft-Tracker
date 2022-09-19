import { Component } from '@angular/core';
import { AuthorizeService } from '../../api-authorization/authorize.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent {
  isAuthenticated: boolean = false;

  constructor(private authService: AuthorizeService) {
    authService.isAuthenticated().subscribe(result => {
      this.isAuthenticated = result;
    });
  }
}
