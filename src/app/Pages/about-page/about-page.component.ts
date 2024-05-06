import { Component } from '@angular/core';
import {IntroduceScreenComponent} from "../../Components/main/introduce-screen/introduce-screen.component";
import {VideoScreenComponent} from "../../Components/main/video-screen/video-screen.component";

@Component({
  selector: 'app-about-page',
  standalone: true,
  imports: [
    IntroduceScreenComponent,
    VideoScreenComponent
  ],
  templateUrl: './about-page.component.html',
  styleUrl: './about-page.component.scss'
})
export class AboutPageComponent {

}
