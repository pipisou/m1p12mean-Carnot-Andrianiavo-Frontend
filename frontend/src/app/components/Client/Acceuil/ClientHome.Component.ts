import {Component} from '@angular/core';
import {NavigationEnd, Router, RouterModule} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {FooterElementComponent} from '../../../footer-element/footer-element.component';
import {NzBreadCrumbModule} from 'ng-zorro-antd/breadcrumb';
import {NzIconModule} from 'ng-zorro-antd/icon';
import {NzMenuModule} from 'ng-zorro-antd/menu';
import {NzLayoutModule} from 'ng-zorro-antd/layout';
import {RouteConf} from '../../../Conf/RouteConf'

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
  page: any = null
  routeConf: any[]
  constructor(private router: Router) {
    this.user = JSON.parse(sessionStorage.getItem("user") || '{}')
    this.routeConf = RouteConf
  }
  ngOnInit(){
    if (!this.user.token){
      this.router.navigate(["/login"])
    }
    this.updatePageFromUrl()
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.updatePageFromUrl()
      }
    });
    console.log(this.user)
  }

  updatePageFromUrl() {
    const urlActuel = this.router.url;
    const routeCorrespondante = this.routeConf.find((e) =>
      urlActuel.toLowerCase().includes(e.path.toLowerCase())
    );

    if (routeCorrespondante) {
      this.page = routeCorrespondante;
    } else {
      this.router.navigate(['/login']);
    }
  }
  changeRoute(url: string){
    this.router.navigate([`/client/${url}`])
  }
}
