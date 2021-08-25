import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrincipalConfigComponent } from './principal-config.component';

describe('PrincipalConfigComponent', () => {
  let component: PrincipalConfigComponent;
  let fixture: ComponentFixture<PrincipalConfigComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrincipalConfigComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrincipalConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
