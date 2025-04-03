import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AbsentAffichComponent } from './absent-affich.component';

describe('AbsentAffichComponent', () => {
  let component: AbsentAffichComponent;
  let fixture: ComponentFixture<AbsentAffichComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AbsentAffichComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AbsentAffichComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
