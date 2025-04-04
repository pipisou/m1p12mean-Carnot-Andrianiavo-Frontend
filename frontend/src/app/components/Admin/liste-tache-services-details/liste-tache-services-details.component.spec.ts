import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeTacheServicesDetailsComponent } from './liste-tache-services-details.component';

describe('ListeTacheServicesDetailsComponent', () => {
  let component: ListeTacheServicesDetailsComponent;
  let fixture: ComponentFixture<ListeTacheServicesDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListeTacheServicesDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListeTacheServicesDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
