import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MapScreenComponent } from './maps/screens/map-screen/map-screen.component';

const routes: Routes = [
  {path:'',component:MapScreenComponent},
  {path:'**',redirectTo:''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
