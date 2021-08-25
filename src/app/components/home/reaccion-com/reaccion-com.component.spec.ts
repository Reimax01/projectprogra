import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReaccionComComponent } from './reaccion-com.component';

describe('ReaccionComComponent', () => {
  let component: ReaccionComComponent;
  let fixture: ComponentFixture<ReaccionComComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReaccionComComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReaccionComComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
