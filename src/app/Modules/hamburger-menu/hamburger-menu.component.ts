import {Component, EventEmitter, Output} from '@angular/core';
import {IsActiveBurgerServiceService} from "../../Services/is-active-burger-service.service";

@Component({
  selector: 'app-hamburger-menu',
  standalone: true,
  imports: [],
  templateUrl: './hamburger-menu.component.html',
  styleUrl: './hamburger-menu.component.scss'
})

export class HamburgerMenuComponent {
  isActive: boolean | undefined;

  constructor(private isActiveBurgerService: IsActiveBurgerServiceService) {
    this.isActiveBurgerService.isActive.subscribe((isActive) => {
      this.isActive = isActive;
    });
  }

  toggleBurger() {
    this.isActiveBurgerService.toggleActiveState();
  }
}
