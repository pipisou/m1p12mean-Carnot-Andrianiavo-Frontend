import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AfficheDeviComponent } from './affiche-devi.component';

describe('AfficheDeviComponent', () => {
  let component: AfficheDeviComponent;
  let fixture: ComponentFixture<AfficheDeviComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AfficheDeviComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AfficheDeviComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
