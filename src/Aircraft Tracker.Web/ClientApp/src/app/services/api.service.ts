import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Flight } from '../interfaces/flight';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private static BASE_URL: string = "https://localhost:44456/api/"
  private static OPENSKY_URL: string = ApiService.BASE_URL + "openSky/"
  private static AIRCRAFT_URL: string = ApiService.BASE_URL + "aircraft/"

  constructor(private http: HttpClient) { }

  public getAllFlights(begin: number, end: number) {
    const params = new HttpParams()
      .set('begin', begin)
      .set('end', end);
    return this.http.get<Flight[]>(ApiService.OPENSKY_URL + "flights/all", { params })
  }

  public getAllFlightsOfAircraft(icao24: string, begin: number, end: number) {
    const params = new HttpParams()
      .set('icao24', icao24)
      .set('begin', begin)
      .set('end', end);
    return this.http.get<Flight[]>(ApiService.OPENSKY_URL + "flights/aircraft", { params })
  }

  public getAirportArrivals(airport: string, begin: number, end: number) {
    const params = new HttpParams()
      .set('airport', airport)
      .set('begin', begin)
      .set('end', end);
    return this.http.get<Flight[]>(ApiService.OPENSKY_URL + "airport/arrival", { params })
  }

  public getAirportDepartures(airport: string, begin: number, end: number) {
    const params = new HttpParams()
      .set('airport', airport)
      .set('begin', begin)
      .set('end', end);
    return this.http.get<Flight[]>(ApiService.OPENSKY_URL + "airport/departure", { params })
  }

  public getAllStates() {
    return this.http.get(ApiService.OPENSKY_URL + "states/all")
  }

  public postMarkedAircraft(icao24: string) {
    return this.http.post(ApiService.AIRCRAFT_URL + "mark", { FlightNr: icao24 })
  }
}
