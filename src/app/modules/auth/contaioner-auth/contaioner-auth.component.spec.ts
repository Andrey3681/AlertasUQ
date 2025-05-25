import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContaionerAuthComponent } from './contaioner-auth.component';

describe('ContaionerAuthComponent', () => {
  let component: ContaionerAuthComponent;
  let fixture: ComponentFixture<ContaionerAuthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContaionerAuthComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContaionerAuthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
