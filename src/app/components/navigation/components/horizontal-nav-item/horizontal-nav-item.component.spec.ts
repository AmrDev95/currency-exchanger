import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HorizontalNavItemComponent } from './horizontal-nav-item.component';

describe('HorizontalNavItemComponent', () => {
  let component: HorizontalNavItemComponent;
  let fixture: ComponentFixture<HorizontalNavItemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HorizontalNavItemComponent]
    });
    fixture = TestBed.createComponent(HorizontalNavItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
