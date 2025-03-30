import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-login-admin',
  imports: [RouterModule, FormsModule, CommonModule ],
  templateUrl: './login-admin.component.html',
  styleUrl: './login-admin.component.css'
})
export class LoginAdminComponent {
  user = {
    email: 'carnotrandriamiandravola@gmail.com',
    motDePasse: 'password123'
  };
}
