import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TarjetaReportComponent } from './tarjeta-report.component';

describe('TarjetaReportComponent', () => {
  let component: TarjetaReportComponent;
  let fixture: ComponentFixture<TarjetaReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TarjetaReportComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TarjetaReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
