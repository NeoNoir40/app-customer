import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistorialDetailsComponent } from './historial-details.component';

describe('HistorialDetailsComponent', () => {
  let component: HistorialDetailsComponent;
  let fixture: ComponentFixture<HistorialDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HistorialDetailsComponent]
    });
    fixture = TestBed.createComponent(HistorialDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
