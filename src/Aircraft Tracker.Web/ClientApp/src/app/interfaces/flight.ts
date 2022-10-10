export interface Flight {
  icao24: string
  firstSeen: number | null
  lastSeen: number | null
  estDepartureAirport: string | null
  estArrivalAirport: string
  callsign: string
  estDepartureAirportHorizDistance: number | null
  estDepartureAirportVertDistance: number | null
  estArrivalAirportHorizDistance: number | null
  estArrivalAirportVertDistance: number | null
  departureAirportCandidatesCount: number | null
}
