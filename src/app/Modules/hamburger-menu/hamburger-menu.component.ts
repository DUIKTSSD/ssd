import {Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-hamburger-menu',
  standalone: true,
  imports: [],
  templateUrl: './hamburger-menu.component.html',
  styleUrl: './hamburger-menu.component.scss'
})
export class HamburgerMenuComponent {

  isActive = false;

  @Output() isActiveChange = new EventEmitter<boolean>();

  toggle() {
    this.isActive = !this.isActive;
    this.isActiveChange.emit(this.isActive);
  }
}
