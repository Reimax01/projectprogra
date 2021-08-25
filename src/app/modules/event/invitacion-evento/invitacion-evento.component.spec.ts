import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvitacionEventoComponent } from './invitacion-evento.component';

describe('InvitacionEventoComponent', () => {
  let component: InvitacionEventoComponent;
  let fixture: ComponentFixture<InvitacionEventoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InvitacionEventoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InvitacionEventoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
