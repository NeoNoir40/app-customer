import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaqueteriasComponent } from './paqueterias.component';

describe('PaqueteriasComponent', () => {
  let component: PaqueteriasComponent;
  let fixture: ComponentFixture<PaqueteriasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PaqueteriasComponent]
    });
    fixture = TestBed.createComponent(PaqueteriasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
