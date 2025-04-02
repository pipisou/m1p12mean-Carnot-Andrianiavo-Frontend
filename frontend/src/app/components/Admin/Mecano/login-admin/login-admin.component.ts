import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { NzButtonModule } from 'ng-zorro-antd/button';

@Component({
  selector: 'app-login-admin',
  imports: [ FormsModule, CommonModule,NzButtonModule ],
  templateUrl: './login-admin.component.html',
  styleUrl: './login-admin.component.css'
})
export class LoginAdminComponent {

  constructor(private router: Router) {
  }

  user = {
    email: 'carnotrandriamiandravola@gmail.com',
    motDePasse: 'password123'
  };
  isAdmin = true
  modifIsAdmin(value: boolean){
    this.isAdmin = value
  }


  submitMecanicien(){
    this.router.navigate(['/mecanicien/']);
  }
  submitAdmin(){
  }
}
