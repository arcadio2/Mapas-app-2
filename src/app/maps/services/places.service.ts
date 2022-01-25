import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Marker } from 'mapbox-gl';
import { PlacesClient } from '../api';
import { PlacesResponse, Feature } from '../interfaces/places';
import { MapService } from './map.service';

@Injectable({
  providedIn: 'root'
})
export class PlacesService {
  //la ubicacion que detecta el navegador
  userLocation!:[number,number];
  public isLoadingPlaces:boolean = false;
  public places:Feature[]=[];

  
  get isUserLocationReady():boolean{
    return !!this.userLocation;
  }

  constructor(private palcesHttp:PlacesClient,private mapService:MapService ) { 
    this.getUserLocation();
  }

  async getUserLocation():Promise<[number,number]>{
    return new Promise((resolve, reject)=>{
      navigator.geolocation.getCurrentPosition(
        ({coords})=>{
          this.userLocation = [coords.longitude,coords.latitude];
          resolve(this.userLocation)

        },
        error=>{
          alert('No se pudo obtener la geolocalización');
          console.log(error);
          reject();
        }
      );
    })
  }

  getPlacesByQuery(query:string=''){

    if(query.length ===0){
      this.isLoadingPlaces = false;
      this.places = [];
      return;
    }
    this.isLoadingPlaces=true;
    if(!this.userLocation) return;
    const access:string ='pk.eyJ1IjoiYXJrZGlvIiwiYSI6ImNrczlwMWJncDA2ODIyb3E4OHBnMzF5aHkifQ.kcAWfmX-zsuXESjaXdKRDQ';
    this.palcesHttp.get<PlacesResponse>(`/${query}.json?`,{
      params:{
        proximity: this.userLocation?.join(',')
      }
    })
    .subscribe(resp=>{
      this.isLoadingPlaces=false;
      this.places=resp.features as Feature[];

      this.mapService.createMarkersFromPlaces( this.places, this.userLocation);

      
    })
  }


  deletePlaces(){
    this.places=[];
  } 
  
}
