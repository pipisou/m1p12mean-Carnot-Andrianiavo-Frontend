import { Component } from '@angular/core';
import {Router, RouterModule} from '@angular/router';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {NzButtonModule} from 'ng-zorro-antd/button';
import {CommonModule} from '@angular/common';
import {NzMessageService} from 'ng-zorro-antd/message';
import {ClientService} from '../../Services/client.service';

@Component({
  selector: 'app-inscription',
  templateUrl: './ViewInscription.html',
  styleUrls: ['./ViewInscription.css'],
  standalone: true,
  imports: [RouterModule, NzButtonModule , FormsModule, ReactiveFormsModule, CommonModule]
})
export class InscriptionComponent {
  inscriptionForm: FormGroup;
  loading = false
  constructor(private fb: FormBuilder, private router: Router, private toast: NzMessageService, private service: ClientService) {
    this.inscriptionForm = this.fb.group({
      nom: ['', [Validators.required, Validators.minLength(2)]],
      prenom: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      motDePasse: ['', [Validators.required, Validators.minLength(6)]],
      telephone: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      retape: ['', Validators.required]
    }, { validator: this.passwordMatchValidator });
  }

  passwordMatchValidator(form: FormGroup) {
    return form.get('motDePasse')!.value === form.get('retape')!.value ? null : { mismatch: true };
  }

  hasError(field: string, errorType: string) {
    return this.inscriptionForm.get(field)?.hasError(errorType) && this.inscriptionForm.get(field)?.touched;
  }

  onSubmit() {
    if (this.inscriptionForm.valid) {
      this.loading = true
      this.service.addClient(this.inscriptionForm.value).subscribe(
        rep=>{
          this.loading = false
          this.router.navigate(["/login"])
          this.toast.success(rep.message, {nzDuration: 5000})
        },
        error => {
          this.loading = false
          this.toast.error(error.message, {nzDuration: 5000})
        }
      )
    }
  }

}
