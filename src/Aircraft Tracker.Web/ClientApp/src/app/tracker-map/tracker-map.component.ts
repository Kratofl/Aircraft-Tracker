import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MapInfoWindow, MapMarker } from "@angular/google-maps";
import { AircraftState } from '../interfaces/aircraft-state';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-tracker-map',
  templateUrl: './tracker-map.component.html'
})
export class TrackerMapComponent implements AfterViewInit {

  aircrafts: AircraftState[] = []
  @ViewChild(MapInfoWindow) infoWindow: MapInfoWindow | undefined;
  clickedAircraft: AircraftState | undefined;
  markerClustererImagePath =
    'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m';

  center: google.maps.LatLngLiteral = {
    lat: 48.6479054,
    lng: 9.2661764
  };

  markerOptions: google.maps.MarkerOptions = {
    icon: {
      url: "assets/airplane_xs.png",
      scaledSize: {
        width: 20,
        height: 20,
        equals(other: google.maps.Size | null): boolean {
          return other?.width == this.width && other?.height == this.height
        }
      }
    },
    draggable: false
  };

  constructor(private _apiService: ApiService) {}

  ngAfterViewInit(): void {
    this._apiService.getAllStates().subscribe((aircraftsObj: any) => this.addAircraftsToArray(aircraftsObj))
  }

  private addAircraftsToArray(aircraftsObj: any) {
    for (const aircraft of aircraftsObj.states) {
      let lat = aircraft[6]
      let lng = aircraft[5]
      if (lat == null || lng == null) continue

      let state: AircraftState = new class implements AircraftState {
        icao24: string = aircraft[0] as string;
        callsign: string | null = aircraft[1] as string | null;
        origin_country: string = aircraft[2] as string;
        time_position: number | null = aircraft[3] as number | null;
        last_contact: number = aircraft[4] as number;
        longitude: number | null = lng as number | null;
        latitude: number | null = lat as number | null;
        baro_altitude: number | null = aircraft[7] as number | null;
        on_ground: boolean = aircraft[8] as boolean;
        velocity: number | null = aircraft[9] as number | null;
      }
      this.aircrafts.push(state)
    }
  }

  getPositionOfAircraft(aircraft: AircraftState): google.maps.LatLngLiteral {
    let lat: number = aircraft.latitude as number
    let lng: number = aircraft.longitude as number
    return {
      lat: lat,
      lng: lng
    }
  }

  openInfoWindow(marker: MapMarker, aircraft: AircraftState) {
    this.clickedAircraft = aircraft;
    if (this.infoWindow != undefined) this.infoWindow.open(marker);
  }


}
