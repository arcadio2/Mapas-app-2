import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Map,Popup, Marker } from 'mapbox-gl';
import { MapService, PlacesService } from '../../services';

@Component({
  selector: 'app-map-view',
  templateUrl: './map-view.component.html',
  styleUrls: ['./map-view.component.css']
})
export class MapViewComponent implements OnInit,AfterViewInit {

  @ViewChild('mapDiv') mapDivElement!:ElementRef;
  constructor(private placesService:PlacesService,private mapService:MapService) { }


  ngOnInit(): void {
    console.log(this.placesService.userLocation)
  }
  ngAfterViewInit(): void {
    if(!this.placesService.userLocation) throw Error('No hay localización')
    const map = new Map({
      container: this.mapDivElement.nativeElement, // container ID
      style: 'mapbox://styles/mapbox/dark-v10', // style URL
      center: this.placesService.userLocation, // starting position [lng, lat]
      zoom: 14 // starting zoom
      });
      const popup = new Popup()
        .setHTML(`
          <h6>Estoy</h6>
          <span>Estoy en un lugar del mundo</span>
        `); 
      new Marker({color:'red'})
        .setLngLat(this.placesService.userLocation)
        .setPopup(popup)
        .addTo(map)

      this.mapService.setMap(map);
  }

}
