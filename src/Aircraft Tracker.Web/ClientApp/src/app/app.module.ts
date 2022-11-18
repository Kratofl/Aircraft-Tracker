import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { TrackerMapComponent } from './tracker-map/tracker-map.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './modules/material.module';
import { ApiService } from './services/api.service';
import { GoogleMapsModule } from '@angular/google-maps';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { LogoutComponent } from './logout/logout.component';

const routes: Routes = [
  { path: '', component: TrackerMapComponent, pathMatch: 'full', data: { title: 'Home', animation: "Home" } },
  { path: 'login', component: LoginComponent, data: { title: 'Login', animation: "Login" } },
  { path: 'register', component: RegisterComponent, data: { title: 'Register', animation: "Register" } },
  { path: 'logout', component: LogoutComponent, data: { title: 'Logout', animation: "Logout" } },
];

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    TrackerMapComponent,
    LoginComponent,
    RegisterComponent,
    LogoutComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    RouterModule.forRoot(routes),
    BrowserAnimationsModule,
    GoogleMapsModule
  ],
  providers: [ApiService],
  exports: [RouterModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
