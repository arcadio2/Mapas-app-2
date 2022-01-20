import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PlacesClient } from '../api';
import { PlacesResponse, Feature } from '../interfaces/places';

@Injectable({
  providedIn: 'root'
})
export class PlacesService {

  userLocation!:[number,number];
  public isLoadingPlaces:boolean = false;
  public places:Feature[]=[];
  
  get isUserLocationReady():boolean{
    return !!this.userLocation;
  }

  constructor(private palcesHttp:PlacesClient) { 
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
    this.isLoadingPlaces=true;
    if(!this.userLocation) return;
    const access:string ='pk.eyJ1IjoiYXJrZGlvIiwiYSI6ImNrczlwMWJncDA2ODIyb3E4OHBnMzF5aHkifQ.kcAWfmX-zsuXESjaXdKRDQ';
    this.palcesHttp.get<PlacesResponse>(`/${query}.json?`,{
      params:{
        proximity: this.userLocation?.join(',')
      }
    })
    .subscribe(resp=>{
      console.log(resp.features)
      this.isLoadingPlaces=false;
      this.places=resp.features as Feature[];
    })
  }
}
