import {Component} from '@angular/core';
import {RouterModule} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {FooterElementComponent} from '../../../footer-element/footer-element.component';
import {SlidebarComponent} from '../../../slidebar/slidebar.component';
import {LandingPageComponent} from '../../landing-page/landing-page.component';
import {LoginComponent} from '../../login/login.component';

@Component({
  selector: 'app-client-home',
  templateUrl: './ClientHome.html',
  styleUrl: './ClientHome.css',
  //standalone: true,
  imports: [RouterModule, FormsModule, CommonModule, FooterElementComponent, SlidebarComponent, LandingPageComponent,LoginComponent ]
})
export class ClientHomeComponent {
  slidebarExpanded = false; // Etat du slidebar (expandé ou non)

  onSlidebarToggle(expanded: boolean) {
    this.slidebarExpanded = expanded;  // Met à jour l'état du slidebar
  }
  ngOnInit(){

  }
}
