import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerticalNavigationComponent } from './vertical-navigation.component';

describe('VerticalNavigationComponent', () => {
  let component: VerticalNavigationComponent;
  let fixture: ComponentFixture<VerticalNavigationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VerticalNavigationComponent]
    });
    fixture = TestBed.createComponent(VerticalNavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
