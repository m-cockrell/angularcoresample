import { SaveVehicle } from './../models/vehicle';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Inject } from '@angular/core';
import 'rxjs/add/operator/map';
import { AuthHttp } from "angular2-jwt/angular2-jwt";

@Injectable()
export class VehicleService {

  private readonly vehiclesEndpoint = '/api/vehicles';

  constructor(private http: Http, private authHttp: AuthHttp, @Inject('ORIGIN_URL') private originUrl: string) {}

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
    return this.authHttp.post(this.vehiclesEndpoint, vehicle)
      .map(res => res.json());
  }

  update(vehicle: SaveVehicle) {
    return this.authHttp.put(this.vehiclesEndpoint + '/' + vehicle.id, vehicle)
    .map(res => res.json());
  }

  delete(id) {
    return this.authHttp.delete(this.vehiclesEndpoint + '/' + id)
      .map(res => res.json());
  }

  getVehicle(id) {
    return this.http.get(this.vehiclesEndpoint + '/' + id)
      .map(res => res.json());
  }

  getVehicles(filter) {
    return this.http.get(this.vehiclesEndpoint + '?' + this.toQueryString(filter))
      .map(res => res.json());
  }

  toQueryString(obj) {
    var parts = [];
    for (var property in obj)
      {
        var value = obj[property];
        if (value != null && value != undefined)
          {
            parts.push(encodeURIComponent(property) + '=' + encodeURIComponent(value));
          }
      }

      return parts.join('&');
  }

}