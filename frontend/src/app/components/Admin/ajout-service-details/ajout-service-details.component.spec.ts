import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjoutServiceDetailsComponent } from './ajout-service-details.component';

describe('AjoutServiceDetailsComponent', () => {
  let component: AjoutServiceDetailsComponent;
  let fixture: ComponentFixture<AjoutServiceDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AjoutServiceDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AjoutServiceDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
