import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable, take } from 'rxjs';

@Component({
  selector: 'app-all-match-results',
  templateUrl: './all-match-results.component.html',
  styleUrls: ['./all-match-results.component.scss'],
})
export class AllMatchResultsComponent implements OnInit {
  /**
   *
   */
  allMatchResults$: Observable<any[]>;
  constructor(private store: Store<{ allMatchResults: any[] }>) {}
  ngOnInit() {
    this.fetchMatchResults();
  }
  fetchMatchResults() {
    this.allMatchResults$ = this.store.pipe(select('allMatchResults'), take(1)); // Store'dan gelen verileri atayın
  }
}
