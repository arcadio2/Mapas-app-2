import { HttpClient, HttpHandler } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from '../../../environments/environment.prod';


@Injectable({
    providedIn:'root'
})

export class DirectionsApiClient extends HttpClient{
    public baseUrl: string='https://api.mapbox.com/directions/v5/mapbox/driving';
    constructor(handler:HttpHandler){
        super(handler);
    }

    //sobreescribimos el metodo get de HttpCLient
    public override get<T>(url:string){
        url = this.baseUrl+url;
        //Mandamos de base el limite y el acces token
        return super.get<T>(url,{
            params:{
                alternatives:false,
                geometries:'geojson',
                language:'es',
                steps:false,
                access_token:environment.apiKey
            }
        });
    }
}