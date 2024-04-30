import { Routes } from '@angular/router';
import {AboutPageComponent} from "./Pages/about-page/about-page.component";



export const routes: Routes = [
  {path: '', redirectTo: 'about', pathMatch: "full"},
  {path: 'about', component: AboutPageComponent}
];
