import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class IsActiveBurgerServiceService {

  private activeStateSource = new BehaviorSubject<boolean>(false);
  isActive = this.activeStateSource.asObservable();

  constructor() { }

  toggleActiveState(){
    this.activeStateSource.next(!this.activeStateSource.value);
  }
}
