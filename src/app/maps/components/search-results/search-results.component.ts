import { Component, OnInit } from '@angular/core';
import { MapService, PlacesService } from '../../services';
import { Feature } from '../../interfaces/places';
import { Route } from '../../interfaces/directions';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css']
})
export class SearchResultsComponent implements OnInit {

  public selectedId ='';
  constructor(private placesService:PlacesService, private mapService:MapService) { }

  get isLoadingPlaces(){
    return this.placesService.isLoadingPlaces; 
  }
  get places(){
    return this.placesService.places;
  }

  ngOnInit(): void {
  }

  flyTo(place:Feature){
    this.selectedId = place.id;
    const [lng,lat] = place.center; 
    this.mapService.flyTo([lng,lat]);   
  }
  getDirectiones(place:Feature){
    if(!this.placesService.userLocation) throw new Error("Necesita localización");
    const start=this.placesService.userLocation;
    const end = place.center as [number,number];
    this.placesService.deletePlaces();
    this.mapService.getRouteBetweenPoints(start,end);
  }

  
}
