import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarModuleComponent } from './navbar-module.component';

describe('NavbarModuleComponent', () => {
  let component: NavbarModuleComponent;
  let fixture: ComponentFixture<NavbarModuleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavbarModuleComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NavbarModuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
