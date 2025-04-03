import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifRendezvousComponent } from './modif-rendezvous.component';

describe('ModifRendezvousComponent', () => {
  let component: ModifRendezvousComponent;
  let fixture: ComponentFixture<ModifRendezvousComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModifRendezvousComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModifRendezvousComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
