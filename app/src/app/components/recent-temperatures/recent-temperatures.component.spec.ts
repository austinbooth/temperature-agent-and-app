import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecentTemperaturesComponent } from './recent-temperatures.component';

describe('RecentTemperaturesComponent', () => {
  let component: RecentTemperaturesComponent;
  let fixture: ComponentFixture<RecentTemperaturesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecentTemperaturesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecentTemperaturesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
