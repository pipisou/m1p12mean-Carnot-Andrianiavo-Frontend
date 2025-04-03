import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifierServiceDetailsComponent } from './modifier-detailservice.component';

describe('ModifierDetailserviceComponent', () => {
  let component: ModifierServiceDetailsComponent;
  let fixture: ComponentFixture<ModifierServiceDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModifierServiceDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModifierServiceDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
