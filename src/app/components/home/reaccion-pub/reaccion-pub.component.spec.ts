import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReaccionPubComponent } from './reaccion-pub.component';

describe('ReaccionPubComponent', () => {
  let component: ReaccionPubComponent;
  let fixture: ComponentFixture<ReaccionPubComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReaccionPubComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReaccionPubComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
