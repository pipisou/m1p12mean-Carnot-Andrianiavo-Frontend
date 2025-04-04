import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeServiceDetailsComponent } from './liste-service-details.component';

describe('ListeServiceDetailsComponent', () => {
  let component: ListeServiceDetailsComponent;
  let fixture: ComponentFixture<ListeServiceDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListeServiceDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListeServiceDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
