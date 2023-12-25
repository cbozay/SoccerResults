import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-match-results',
  templateUrl: './match-results.component.html',
  styleUrls: ['./match-results.component.scss'],
})
export class MatchResultsComponent implements OnInit {
  /**
   *
   */
  matchResults$: Observable<any[]>;
  week: number;
  constructor(private store: Store<{ matchResults: any[] }>) {}

  ngOnInit() {
    this.matchResults$ = this.store.pipe(select('matchResults'));

    this.matchResults$.subscribe((results) => {
      if (results.length > 0) {
        this.week = results[0]?.week;
      }
    });
  }
}
