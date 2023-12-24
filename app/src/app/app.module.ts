import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PaginatorModule } from 'primeng/paginator';
import { ComponentsModule } from './components/components.module';
import { matchResultsReducer } from './store/reducers/matchResults.reducer';
import { allMatchResultsReducer } from './store/reducers/allMatchResults.reducer';
import { championshipProbabilitiesReducer } from './store/reducers/championshipProbabilities.reducer';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    TableModule,
    PaginatorModule,
    ButtonModule,
    NgbModule,
    ComponentsModule,
    StoreModule.forRoot({
      matchResults: matchResultsReducer,
      allMatchResults: allMatchResultsReducer,
      championshipProbabilities: championshipProbabilitiesReducer,
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
