import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatchResultsComponent } from './match-results/match-results.component';
import { TableModule } from 'primeng/table';
import { PaginatorModule } from 'primeng/paginator';
import { AllMatchResultsComponent } from './all-match-results/all-match-results.component';
import { ChampionshipProbabilitiesComponent } from './championship-probabilities/championship-probabilities.component';
import { ButtonModule } from 'primeng/button';

@NgModule({
  declarations: [
    MatchResultsComponent,
    AllMatchResultsComponent,
    ChampionshipProbabilitiesComponent,
  ],
  imports: [CommonModule, TableModule, PaginatorModule, ButtonModule],
  exports: [
    MatchResultsComponent,
    AllMatchResultsComponent,
    ChampionshipProbabilitiesComponent,
  ],
})
export class ComponentsModule {}
