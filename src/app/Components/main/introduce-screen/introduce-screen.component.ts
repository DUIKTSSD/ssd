import { Component } from '@angular/core';
import {HeaderComponent} from "../../header/header_comp/header.component";

@Component({
  selector: 'app-introduce-screen',
  standalone: true,
  imports: [
    HeaderComponent
  ],
  templateUrl: './introduce-screen.component.html',
  styleUrl: './introduce-screen.component.scss'
})
export class IntroduceScreenComponent {

}
