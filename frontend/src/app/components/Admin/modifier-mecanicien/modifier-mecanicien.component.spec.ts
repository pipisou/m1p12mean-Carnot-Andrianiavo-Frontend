import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifierMecanicienComponent } from './modifier-mecanicien.component';

describe('ModifierMecanicienComponent', () => {
  let component: ModifierMecanicienComponent;
  let fixture: ComponentFixture<ModifierMecanicienComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModifierMecanicienComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModifierMecanicienComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
