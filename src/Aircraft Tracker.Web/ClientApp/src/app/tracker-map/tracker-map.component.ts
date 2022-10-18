import { Component, ViewChild } from '@angular/core';
import { MapInfoWindow, MapMarker } from "@angular/google-maps";

@Component({
  selector: 'app-tracker-map',
  templateUrl: './tracker-map.component.html'
})
export class TrackerMapComponent {

  constructor() {
    let aircrafts = [
      {
        lat: 18.6479054,
        lng: 90.2661764,
      },
      {
        lat: 48.6479054,
        lng: 9.2661764,
      },
    ]
    for (const aircraft of aircrafts) {
      this.addMarker({
        lat: aircraft.lat,
        lng: aircraft.lng
      })
    }
  }

  @ViewChild(MapInfoWindow) infoWindow: MapInfoWindow | undefined;

  center: google.maps.LatLngLiteral = {
    lat: 48.6479054,
    lng: 9.2661764
  };

  markerOptions: google.maps.MarkerOptions = {
    icon: {
      url: "assets/airplane.png",
      scaledSize: {
        width: 30,
        height: 30,
        equals(other: google.maps.Size | null): boolean {
          return other?.width == this.width && other?.height == this.height
        }
      }
    },
    draggable: false
  };

  aircraftPositions: google.maps.LatLngLiteral[] = [];

  addMarker(latLngLiteral: google.maps.LatLngLiteral) {
    this.aircraftPositions.push(latLngLiteral);
  }

  openInfoWindow(marker: MapMarker) {
    if (this.infoWindow != undefined) this.infoWindow.open(marker);
  }


}
