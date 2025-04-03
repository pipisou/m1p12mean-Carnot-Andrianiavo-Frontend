import { Component } from '@angular/core';
import {RouterModule, Router} from '@angular/router';
import {FormsModule} from '@angular/forms';
import { ApiService } from '../../api.service';
import {CommonModule} from '@angular/common';
import { NzMessageService} from 'ng-zorro-antd/message';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  standalone: true,
  imports: [RouterModule, FormsModule, CommonModule ]
})
export class LoginComponent {
  user = {
    email: 'carnotrandriamiandravola@gmail.com',
    motDePasse: 'password123'
  };
  isLoading:boolean = false;
  errorMessage: string = '';

  constructor(private apiService: ApiService,private message: NzMessageService, private router: Router) {}
  ngOnInit() {
    const user = JSON.parse(sessionStorage.getItem("user") || '{}');
    if (user.token){
      this.apiService.checkToken({ Authorization: `Bearer ${user.token}` }).subscribe(
        response => {
          this.redirectToHome()
        },
        error => {
        }
      );

    }
  }
  redirectToHome(){
    this.router.navigate(['/client/home']);
  }
  onSubmit() {
    this.isLoading = true;
    this.apiService.login(this.user).subscribe(
      response => {
        this.isLoading = false
        sessionStorage.setItem("user",JSON.stringify(response))
        this.redirectToHome()
      },
      error => {
        this.isLoading = false;
        this.errorMessage = error.message
        this.message.error("Verifier votre mot de passe ou l'email",{ nzDuration: 5000 });
      }
    );
  }
}
