import { Component, OnInit } from '@angular/core';
import { MapService } from '../../services';
import { PlacesService } from '../../services/places.service';

@Component({
  selector: 'app-btn-my-location',
  templateUrl: './btn-my-location.component.html',
  styleUrls: ['./btn-my-location.component.css']
})
export class BtnMyLocationComponent implements OnInit {

  constructor(private palceService:PlacesService,private mapService:MapService) { }

  ngOnInit(): void {
  }
  goToMyLocation(){
    if(!this.palceService.isUserLocationReady ) throw  Error('No hay ubicación del usuario')
    if(!this.mapService.isMapReady) throw Error('No hay mapa disponible');
    this.mapService.flyTo(this.palceService.userLocation!)
  }
}
