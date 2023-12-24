import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChampionshipProbabilitiesComponent } from './championship-probabilities.component';

describe('ChampionshipProbabilitiesComponent', () => {
  let component: ChampionshipProbabilitiesComponent;
  let fixture: ComponentFixture<ChampionshipProbabilitiesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChampionshipProbabilitiesComponent]
    });
    fixture = TestBed.createComponent(ChampionshipProbabilitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
