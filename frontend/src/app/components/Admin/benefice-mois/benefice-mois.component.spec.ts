import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BeneficeMoisComponent } from './benefice-mois.component';

describe('BeneficeMoisComponent', () => {
  let component: BeneficeMoisComponent;
  let fixture: ComponentFixture<BeneficeMoisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BeneficeMoisComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BeneficeMoisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
