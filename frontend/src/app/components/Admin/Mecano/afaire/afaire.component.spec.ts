import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AfaireComponent } from './afaire.component';

describe('AfaireComponent', () => {
  let component: AfaireComponent;
  let fixture: ComponentFixture<AfaireComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AfaireComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AfaireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
