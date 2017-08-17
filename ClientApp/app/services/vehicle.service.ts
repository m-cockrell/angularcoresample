import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Inject } from '@angular/core';
import 'rxjs/add/operator/map';

@Injectable()
export class VehicleService {

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

}