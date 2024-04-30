import { Component } from '@angular/core';
import {NavbarModuleComponent} from "../../../Modules/navbar-module/navbar-module.component";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    NavbarModuleComponent
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

}
