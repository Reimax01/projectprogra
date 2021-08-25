import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReaccionCdetComponent } from './reaccion-cdet.component';

describe('ReaccionCdetComponent', () => {
  let component: ReaccionCdetComponent;
  let fixture: ComponentFixture<ReaccionCdetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReaccionCdetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReaccionCdetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
