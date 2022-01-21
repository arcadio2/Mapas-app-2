import { Component, OnInit } from '@angular/core';
import { MapService, PlacesService } from '../../services';
import { Feature } from '../../interfaces/places';

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

}
