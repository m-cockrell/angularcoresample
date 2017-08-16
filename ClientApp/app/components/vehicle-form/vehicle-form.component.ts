import { VehicleService } from './../../services/vehicle.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-vehicle-form',
  templateUrl: './vehicle-form.component.html',
  styleUrls: ['./vehicle-form.component.css']
})
export class VehicleFormComponent implements OnInit {

  makes: any[];
  models: any[];
  features: any[];
  vehicle: any = {};

  constructor(
    private vehicleService: VehicleService) { }

  ngOnInit() {
    // hit the service and grab all the makes to populate the drop down
    this.vehicleService.getMakes().subscribe(makes =>
      this.makes = makes); 
      
    this.vehicleService.getFeatures().subscribe(features =>
      this.features = features);
  }

  onMakeChange() {
    // get the selected make from the model set by the dropdown
    var selectedMake = this.makes.find(m => m.id == this.vehicle.make);
    //if we had a larger data set we would actually make another service call to a models repo instead of pushing everything down with (makes)
    this.models = selectedMake ? selectedMake.models : [];
  }

}
