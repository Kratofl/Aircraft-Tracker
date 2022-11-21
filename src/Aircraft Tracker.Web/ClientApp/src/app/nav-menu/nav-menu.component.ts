import {Component, OnInit} from '@angular/core';
import {ApiService} from "../services/api.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html'
})
export class NavMenuComponent implements OnInit {
  isExpanded: boolean = false;
  isAuthenticated: boolean = false;
  name: string = "";

  constructor(private router: Router,
              private _apiService: ApiService)
  {
    router.events.subscribe((val) => {
      this.updateAuthStatus()
    })
  }

  collapse() {
    this.isExpanded = false;
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
  }

  ngOnInit(): void {
    this.updateAuthStatus()
  }

  updateAuthStatus() {
    this._apiService.getAuthStatus().subscribe({
      next: (nameObj) => {
        this.isAuthenticated = true;
        this.name = nameObj.name
      },
      error: () => this.isAuthenticated = false
    })
  }
}
