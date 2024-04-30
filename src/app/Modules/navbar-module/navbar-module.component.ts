import { Component } from '@angular/core';
import {HamburgerMenuComponent} from "../hamburger-menu/hamburger-menu.component";

@Component({
  selector: 'app-navbar-module',
  standalone: true,
  imports: [
    HamburgerMenuComponent
  ],
  templateUrl: './navbar-module.component.html',
  styleUrl: './navbar-module.component.scss'
})
export class NavbarModuleComponent {

}
