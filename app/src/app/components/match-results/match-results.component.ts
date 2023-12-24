import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';

@Component({
  selector: 'app-match-results',
  templateUrl: './match-results.component.html',
  styleUrls: ['./match-results.component.scss'],
})
export class MatchResultsComponent implements OnInit {
  /**
   *
   */
  matchResults: any[] = [];
  week: number;
  constructor(private store: Store<{ matchResults: any[] }>) {}

  ngOnInit() {
    this.store.pipe(select('matchResults')).subscribe((results) => {
      // Seçilen veriyi matchResults değişkenine ata
      this.matchResults = results;
      // console.log(this.matchResults);

      this.week = this.matchResults.at(0)?.week;
    });
  }
}
