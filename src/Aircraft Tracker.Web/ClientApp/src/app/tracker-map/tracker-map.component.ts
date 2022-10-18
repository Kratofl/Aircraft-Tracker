import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MapInfoWindow, MapMarker } from "@angular/google-maps";
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-tracker-map',
  templateUrl: './tracker-map.component.html'
})
export class TrackerMapComponent implements AfterViewInit {

  constructor(private _apiService: ApiService) {}

  ngAfterViewInit(): void {
     this._apiService.getAllStates().subscribe((states: any) => this.addAllAircraftToMap(states.states))
  }

  @ViewChild(MapInfoWindow) infoWindow: MapInfoWindow | undefined;

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

  aircraftPositions: google.maps.LatLngLiteral[] = [];

  addAllAircraftToMap(aircrafts: []) {
    for (const aircraft of aircrafts) {
      let lng = aircraft[5]
      let lat = aircraft[6]
      if (typeof lng === "number" && typeof lat === "number") {
        this.addMarker({
          lat: lat,
          lng: lng
        })
      }
    }
  }

  addMarker(latLngLiteral: google.maps.LatLngLiteral) {
    this.aircraftPositions.push(latLngLiteral);
  }

  openInfoWindow(marker: MapMarker) {
    if (this.infoWindow != undefined) this.infoWindow.open(marker);
  }


}
