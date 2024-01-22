import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicationLoaderComponent } from './application-loader.component';

describe('ApplicationLoaderComponent', () => {
  let component: ApplicationLoaderComponent;
  let fixture: ComponentFixture<ApplicationLoaderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ApplicationLoaderComponent]
    });
    fixture = TestBed.createComponent(ApplicationLoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
