import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HorairesMecanicienComponent } from './horaires-mecanicien.component';

describe('HorairesMecanicienComponent', () => {
  let component: HorairesMecanicienComponent;
  let fixture: ComponentFixture<HorairesMecanicienComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HorairesMecanicienComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HorairesMecanicienComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
