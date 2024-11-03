import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AverageTemperaturesComponent } from './average-temperatures.component';

describe('AverageTemperaturesComponent', () => {
  let component: AverageTemperaturesComponent;
  let fixture: ComponentFixture<AverageTemperaturesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AverageTemperaturesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AverageTemperaturesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
