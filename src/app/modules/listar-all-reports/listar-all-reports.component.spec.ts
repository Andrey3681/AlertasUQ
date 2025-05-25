import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarAllReportsComponent } from './listar-all-reports.component';

describe('ListarAllReportsComponent', () => {
  let component: ListarAllReportsComponent;
  let fixture: ComponentFixture<ListarAllReportsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListarAllReportsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListarAllReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
