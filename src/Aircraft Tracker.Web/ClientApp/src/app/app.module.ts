import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { TrackerMapComponent } from './tracker-map/tracker-map.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './modules/material.module';
import { ApiService } from './services/api.service';
import { GoogleMapsModule } from '@angular/google-maps';

const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full', data: { title: 'Home', animation: "Home" } },
  { path: 'tracker', component: TrackerMapComponent, data: { title: 'Tracker', animation: "Tracker" } },
];

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    TrackerMapComponent,
    LoginComponent,
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
