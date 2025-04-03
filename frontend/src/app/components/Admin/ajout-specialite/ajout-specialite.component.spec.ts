import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjoutSpecialiteComponent } from './ajout-specialite.component';

describe('AjoutSpecialiteComponent', () => {
  let component: AjoutSpecialiteComponent;
  let fixture: ComponentFixture<AjoutSpecialiteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AjoutSpecialiteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AjoutSpecialiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
