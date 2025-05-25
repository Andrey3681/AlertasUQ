import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportEstadisticaComponent } from './report-estadistica.component';

describe('ReportEstadisticaComponent', () => {
  let component: ReportEstadisticaComponent;
  let fixture: ComponentFixture<ReportEstadisticaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReportEstadisticaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReportEstadisticaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
