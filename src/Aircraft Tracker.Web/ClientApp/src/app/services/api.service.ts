import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Flight } from '../interfaces/flight';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private static BASE_URL: string = "https://localhost:44456/api/openSky/"

  constructor(private http: HttpClient) { }

  public getAllFlights(begin: number, end: number) {
    const params = new HttpParams()
      .set('begin', begin)
      .set('end', end);
    return this.http.get<Flight[]>(ApiService.BASE_URL + "flights/all", { params })
  }
}
