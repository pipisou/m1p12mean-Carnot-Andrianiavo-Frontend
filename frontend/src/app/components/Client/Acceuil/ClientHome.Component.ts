import {Component} from '@angular/core';
import {Router, RouterModule} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {FooterElementComponent} from '../../../footer-element/footer-element.component';
import {NzBreadCrumbModule} from 'ng-zorro-antd/breadcrumb';
import {NzIconModule} from 'ng-zorro-antd/icon';
import {NzMenuModule} from 'ng-zorro-antd/menu';
import {NzLayoutModule} from 'ng-zorro-antd/layout';

@Component({
  selector: 'app-client-home',
  templateUrl: './ClientHome.html',
  styleUrl: './ClientHome.css',
  //standalone: true,
  imports: [RouterModule, FormsModule, CommonModule, FooterElementComponent, NzBreadCrumbModule, NzIconModule, NzMenuModule, NzLayoutModule]
})
export class ClientHomeComponent {
  isCollapsed = false;
  user: any
  img: string = 'images/logo.png'
  constructor(private router: Router) {
    this.user = JSON.parse(localStorage.getItem("user") || '{}')
  }
  ngOnInit(){
    if (!this.user.token){
      this.router.navigate(["/login"])
    }
  }
}
