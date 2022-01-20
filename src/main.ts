import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import Mapboxgl from 'mapbox-gl'; 

Mapboxgl.accessToken = 'pk.eyJ1IjoiYXJrZGlvIiwiYSI6ImNrczlwMWJncDA2ODIyb3E4OHBnMzF5aHkifQ.kcAWfmX-zsuXESjaXdKRDQ';
if(!navigator.geolocation){
  alert('Navegador no soporta la Geololazación')
  throw new Error('Navegador no soporta la Geololazación');
}

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
