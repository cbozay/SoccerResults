import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllMatchResultsComponent } from './all-match-results.component';

describe('AllMatchResultsComponent', () => {
  let component: AllMatchResultsComponent;
  let fixture: ComponentFixture<AllMatchResultsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AllMatchResultsComponent]
    });
    fixture = TestBed.createComponent(AllMatchResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
