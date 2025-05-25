import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertChangePasswordRecuperadaCorrectamenteComponent } from './alert-change-password-recuperada-correctamente.component';

describe('AlertChangePasswordRecuperadaCorrectamenteComponent', () => {
  let component: AlertChangePasswordRecuperadaCorrectamenteComponent;
  let fixture: ComponentFixture<AlertChangePasswordRecuperadaCorrectamenteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlertChangePasswordRecuperadaCorrectamenteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AlertChangePasswordRecuperadaCorrectamenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
