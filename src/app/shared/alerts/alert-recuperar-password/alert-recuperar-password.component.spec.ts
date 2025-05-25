import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertRecuperarPasswordComponent } from './alert-recuperar-password.component';

describe('AlertRecuperarPasswordComponent', () => {
  let component: AlertRecuperarPasswordComponent;
  let fixture: ComponentFixture<AlertRecuperarPasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlertRecuperarPasswordComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AlertRecuperarPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
