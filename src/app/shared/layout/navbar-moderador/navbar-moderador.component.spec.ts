import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarModeradorComponent } from './navbar-moderador.component';

describe('NavbarModeradorComponent', () => {
  let component: NavbarModeradorComponent;
  let fixture: ComponentFixture<NavbarModeradorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavbarModeradorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavbarModeradorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
