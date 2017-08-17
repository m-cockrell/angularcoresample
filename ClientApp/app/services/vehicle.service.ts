import { SaveVehicle } from './../models/vehicle';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Inject } from '@angular/core';
import 'rxjs/add/operator/map';

@Injectable()
export class VehicleService {

  private readonly vehiclesEndpoint = '/api/vehicles';

  constructor(private http: Http, @Inject('ORIGIN_URL') private originUrl: string) {}

  getMakes() {
    // standard api call mapped to an object from json response
    return this.http.get(this.originUrl + '/api/makes')
      .map(res => res.json());
  }
  
  getFeatures() {
    // standard api call mapped to an object from json response
    return this.http.get(this.originUrl + '/api/features')
      .map(res => res.json());
  }

  create(vehicle: SaveVehicle) {
    return this.http.post(this.vehiclesEndpoint, vehicle)
      .map(res => res.json());
  }

  update(vehicle: SaveVehicle) {
    return this.http.put(this.vehiclesEndpoint + '/' + vehicle.id, vehicle)
    .map(res => res.json());
  }

  delete(id) {
    return this.http.delete(this.vehiclesEndpoint + '/' + id)
      .map(res => res.json());
  }

  getVehicle(id) {
    return this.http.get(this.vehiclesEndpoint + '/' + id)
      .map(res => res.json());
  }

  getVehicles() {
    return this.http.get(this.vehiclesEndpoint)
      .map(res => res.json());
  }

}