import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';

@Component({
  selector: 'app-all-match-results',
  templateUrl: './all-match-results.component.html',
  styleUrls: ['./all-match-results.component.scss'],
})
export class AllMatchResultsComponent implements OnInit {
  /**
   *
   */
  allMatchResults: any[] = [];
  constructor(private store: Store<{ allMatchResults: any[] }>) {}
  ngOnInit() {
    this.store.pipe(select('allMatchResults')).subscribe((results) => {
      // Seçilen veriyi matchResults değişkenine ata
      this.allMatchResults = results;
    });
  }
}
