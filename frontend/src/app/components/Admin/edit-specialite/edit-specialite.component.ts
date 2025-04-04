import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SpecialiteService } from '../../../Services/specialite.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-edit-specialite',
  templateUrl: './edit-specialite.component.html',
  styleUrls: ['./edit-specialite.component.css'],
  imports: [RouterModule, CommonModule, ReactiveFormsModule]
})
export class EditSpecialiteComponent implements OnInit {
  specialiteForm!: FormGroup;
  specialiteId: string = '';

  constructor(
    private fb: FormBuilder,
    private specialiteService: SpecialiteService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.specialiteId = params.get('id')!;
      this.specialiteService.getSpecialites().subscribe((data: any) => {
        const specialite = data.find((s: any) => s._id === this.specialiteId);
        if (specialite) {
          this.specialiteForm.patchValue({ typeSpecialite: specialite.typeSpecialite });
        }
      });
    });

    this.specialiteForm = this.fb.group({
      typeSpecialite: ['', Validators.required]
    });
  }

  updateSpecialite(): void {
    if (this.specialiteForm.invalid) {
      return;
    }

    this.specialiteService.updateSpecialite(this.specialiteId, this.specialiteForm.value)
      .subscribe(() => {
        alert('Spécialité mise à jour avec succès !');
        this.router.navigate(['/specialites']);
      });
  }
}
