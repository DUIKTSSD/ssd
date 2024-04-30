import { Component } from '@angular/core';
import {IntroduceScreenComponent} from "../../Components/main/introduce-screen/introduce-screen.component";

@Component({
  selector: 'app-about-page',
  standalone: true,
  imports: [
    IntroduceScreenComponent
  ],
  templateUrl: './about-page.component.html',
  styleUrl: './about-page.component.css'
})
export class AboutPageComponent {

}
