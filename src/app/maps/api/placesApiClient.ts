import { HttpClient, HttpHandler, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from '../../../environments/environment.prod';


@Injectable({
    providedIn:'root'
})

export class PlacesClient extends HttpClient{
    public baseUrl: string='https://api.mapbox.com/geocoding/v5/mapbox.places';
    constructor(handler:HttpHandler){
        super(handler);
    }

    //sobreescribimos el metodo get de HttpCLient
    public override get<T>(url:string, options:{
        params?:HttpParams |{
            [param:string]:string | number | boolean | ReadonlyArray<string| number | boolean>;
        }
    }){
        url = this.baseUrl+url;
        //Mandamos de base el limite y el acces token
        return super.get<T>(url,{
            params:{
                limit:'5',
                language:'es',
                access_token:environment.apiKey,
                ...options.params 
            }
        });
    }
}