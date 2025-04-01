import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AfficheDetailTacheComponent } from './affiche-detail-tache.component';

describe('AfficheDetailTacheComponent', () => {
  let component: AfficheDetailTacheComponent;
  let fixture: ComponentFixture<AfficheDetailTacheComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AfficheDetailTacheComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AfficheDetailTacheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
