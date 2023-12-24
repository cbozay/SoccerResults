import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatchResultsComponent } from './match-results/match-results.component';
import { TableModule } from 'primeng/table';
import { PaginatorModule } from 'primeng/paginator';

@NgModule({
  declarations: [MatchResultsComponent],
  imports: [CommonModule, TableModule, PaginatorModule],
  exports: [MatchResultsComponent],
})
export class ComponentsModule {}
