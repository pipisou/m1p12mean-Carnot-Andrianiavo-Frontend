import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjoutMecanicienComponent } from './ajout-mecanicien.component';

describe('AjoutMecanicienComponent', () => {
  let component: AjoutMecanicienComponent;
  let fixture: ComponentFixture<AjoutMecanicienComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AjoutMecanicienComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AjoutMecanicienComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
