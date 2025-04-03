import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeMecanoComponent } from './home-mecano.component';

describe('HomeMecanoComponent', () => {
  let component: HomeMecanoComponent;
  let fixture: ComponentFixture<HomeMecanoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeMecanoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeMecanoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
