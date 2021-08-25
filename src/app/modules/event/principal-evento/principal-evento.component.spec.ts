import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrincipalEventoComponent } from './principal-evento.component';

describe('PrincipalEventoComponent', () => {
  let component: PrincipalEventoComponent;
  let fixture: ComponentFixture<PrincipalEventoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrincipalEventoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrincipalEventoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
