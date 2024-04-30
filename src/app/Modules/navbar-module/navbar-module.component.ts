import { Component } from '@angular/core';
import {HamburgerMenuComponent} from "../hamburger-menu/hamburger-menu.component";
import {IsActiveBurgerServiceService} from "../../Services/is-active-burger-service.service";
import {NgOptimizedImage} from "@angular/common";

@Component({
  selector: 'app-navbar-module',
  standalone: true,
  imports: [
    HamburgerMenuComponent,
    NgOptimizedImage
  ],
  templateUrl: './navbar-module.component.html',
  styleUrl: './navbar-module.component.scss'
})
export class NavbarModuleComponent {

  isActiveNavBar: boolean | undefined;

  constructor(isActiveBurgerService: IsActiveBurgerServiceService) {
    isActiveBurgerService.isActive.subscribe((isActive) => {
      this.isActiveNavBar = isActive;
    });
  }
}
