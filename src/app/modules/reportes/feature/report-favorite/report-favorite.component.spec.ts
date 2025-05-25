import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportFavoriteComponent } from './report-favorite.component';

describe('ReportFavoriteComponent', () => {
  let component: ReportFavoriteComponent;
  let fixture: ComponentFixture<ReportFavoriteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReportFavoriteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReportFavoriteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
