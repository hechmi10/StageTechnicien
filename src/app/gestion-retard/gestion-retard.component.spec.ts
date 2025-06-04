import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionRetardComponent } from './gestion-retard.component';

describe('GestionRetardComponent', () => {
  let component: GestionRetardComponent;
  let fixture: ComponentFixture<GestionRetardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GestionRetardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GestionRetardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
