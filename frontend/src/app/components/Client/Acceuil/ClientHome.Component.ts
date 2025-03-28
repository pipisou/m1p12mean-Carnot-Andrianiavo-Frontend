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
import {NzDropDownModule} from 'ng-zorro-antd/dropdown';
import {QuitterService} from '../../quitter/quitter.service';
import {RendezVousService} from '../../../Services/rendez-vous.service';
import {RenderVous} from '../../../Models/Interfaces';
import {AbsentAffichComponent} from '../absent-affich/absent-affich.component';
import {NzListModule} from 'ng-zorro-antd/list';
import {CurrentCommandeService} from '../commande/current-commande.service';

@Component({
  selector: 'app-client-home',
  templateUrl: './ClientHome.html',
  styleUrl: './ClientHome.css',
  standalone: true,
  imports: [RouterModule, NzDropDownModule, FormsModule, CommonModule, FooterElementComponent, NzBreadCrumbModule, NzIconModule, NzMenuModule, NzLayoutModule, AbsentAffichComponent, NzListModule]
})
export class ClientHomeComponent {
  isCollapsed = false;
  user: any
  page: any = null
  routeConf: any[]
  constructor(private router: Router, private quitter: QuitterService, private rendezVous: RendezVousService, private currentRendeVousObject: CurrentCommandeService) {
    this.user = JSON.parse(sessionStorage.getItem("user") || '{}')
    this.routeConf = RouteConf
  }
  ngOnInit(){
    if (!this.user.token){
      this.router.navigate(["/login"])
    }
    this.getAbsent()
    this.updatePageFromUrl()
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.updatePageFromUrl()
      }
    });
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
    if (url.includes('service')){
      this.currentRendeVousObject.updateCommande(null)
    }
    this.router.navigate([`/client/${url}`])
  }

  logOut(){
    this.quitter.showConfirm()
  }

  loadingEncours = true
  private _tabAbs: RenderVous[]=[]

  get tabAbs(): RenderVous[] {
    return this._tabAbs;
  }

  set tabAbs(value: RenderVous[]) {
    if (value.length>0){
      this.showAbsent=true
    }
    this._tabAbs = value;
  }


  showAbsent = false
  getAbsent(){
    this.loadingEncours = true
    this.rendezVous.getAbsent({ Authorization: `Bearer ${this.user.token}` }).subscribe(
      rep=>{
        this.tabAbs=rep
        this.loadingEncours=false
      },
      error=>{
        console.log(error)
        this.loadingEncours=false
      }
    )
  }

  reload(){
    this.getAbsent()
  }

  hideAbsent(){
    this.showAbsent = false
  }
}
