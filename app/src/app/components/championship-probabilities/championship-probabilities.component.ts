import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Team } from 'src/app/interfaces/team';

@Component({
  selector: 'app-championship-probabilities',
  templateUrl: './championship-probabilities.component.html',
  styleUrls: ['./championship-probabilities.component.scss'],
})
export class ChampionshipProbabilitiesComponent implements OnInit {
  /**
   *
   */
  championshipProbabilities: { team: Team; probability: number }[] = [];
  constructor(
    private store: Store<{
      championshipProbabilities: { team: Team; probability: number }[];
    }>
  ) {}
  ngOnInit() {
    this.store
      .pipe(select('championshipProbabilities'))
      .subscribe((results) => {
        // Seçilen veriyi matchResults değişkenine ata
        this.championshipProbabilities = results;
        console.log(this.championshipProbabilities);
      });
  }
}
