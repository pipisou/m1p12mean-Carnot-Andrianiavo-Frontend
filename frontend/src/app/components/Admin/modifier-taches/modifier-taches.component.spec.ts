import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifierTachesComponent } from './modifier-taches.component';

describe('ModifierTachesComponent', () => {
  let component: ModifierTachesComponent;
  let fixture: ComponentFixture<ModifierTachesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModifierTachesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModifierTachesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
