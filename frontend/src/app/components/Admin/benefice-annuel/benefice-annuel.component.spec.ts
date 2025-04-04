import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BeneficeAnnuelComponent } from './benefice-annuel.component';

describe('BeneficeAnnuelComponent', () => {
  let component: BeneficeAnnuelComponent;
  let fixture: ComponentFixture<BeneficeAnnuelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BeneficeAnnuelComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BeneficeAnnuelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
