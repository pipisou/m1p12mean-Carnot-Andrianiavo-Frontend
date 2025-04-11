import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzMessageService } from 'ng-zorro-antd/message';
import { ApiService } from '../../../../api.service';

@Component({
  selector: 'app-login-admin',
  imports: [ FormsModule, CommonModule,NzButtonModule ],
  templateUrl: './login-admin.component.html',
  styleUrl: './login-admin.component.css'
})
export class LoginAdminComponent {

  constructor(private router: Router, private apiLogin: ApiService, private toast: NzMessageService) {
  }

  user = {
    email: 'kelymau13@gmail.com',
    motDePasse: 'password123'
  };
  isAdmin = true
  isLoading= false
  modifIsAdmin(value: boolean){
    this.isLoading=false
    this.user = {
      email: 'carnotrandriamiandravola@gmail.com',
      motDePasse: '12345678'
    };
    if (value){
      this.user = {
        email: 'kelymau13@gmail.com',
        motDePasse: 'password123'
      };
    }
    this.isAdmin = value
  }


  submitMecanicien(){
    this.isLoading = true
    this.apiLogin.loginMecanicien(this.user).subscribe(
      rep=>{
        sessionStorage.setItem("user",JSON.stringify(rep))
        this.isLoading = false
        this.router.navigate(['/mecanicien/']);
      },
      error=>{
        this.isLoading = false
        this.toast.error(error.message, {nzDuration: 5000})
      }
    )
  }
  submitAdmin(){
    this.isLoading = true
    this.apiLogin.loginAdmin(this.user).subscribe(
      rep=>{
        sessionStorage.setItem("user",JSON.stringify(rep))
        this.isLoading = false
        this.router.navigate(['/admin/menu/rendezVousNow']);
      },
      error=>{
        this.isLoading = false
        this.toast.error(error.message, {nzDuration: 5000})
      }
    )
  }
}
