import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IntroduceScreenComponent } from './introduce-screen.component';

describe('IntroduceScreenComponent', () => {
  let component: IntroduceScreenComponent;
  let fixture: ComponentFixture<IntroduceScreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IntroduceScreenComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(IntroduceScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
