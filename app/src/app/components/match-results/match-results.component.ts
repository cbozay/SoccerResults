import { Component, OnInit, ViewChild } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { InputNumber } from 'primeng/inputnumber';
import * as NewScoreActions from '../../store/actions/newScore.action';

@Component({
  selector: 'app-match-results',
  templateUrl: './match-results.component.html',
  styleUrls: ['./match-results.component.scss'],
})
export class MatchResultsComponent implements OnInit {
  @ViewChild('homeNewScore') homeNewScore!: InputNumber;
  @ViewChild('awayNewScore') awayNewScore!: InputNumber;
  matchResults: any[] = [];
  week: number;

  constructor(
    private store: Store<{ matchResults: any[] }>,
    private newScoreStore: Store<{ newScore: any }>
  ) {}

  ngOnInit() {
    this.store.pipe(select('matchResults')).subscribe((results) => {
      this.matchResults = results;
      this.week = this.matchResults?.[0]?.week;
    });
  }

  toggleEditMode(index: number) {
    this.matchResults = this.matchResults.map((match, i) => {
      // console.log(match);
      if (i === index) {
        return {
          ...match,
          editMode: !match.editMode, // Düzenleme modunu tersine çevir
        };
      }
      return match;
    });
  }

  saveNewScore(matchIndex: number) {
    const updatedMatch = this.matchResults[matchIndex];

    // Hafta sayısı, takım adları ve yeni skorları yazdırma

    const newScore = {
      week: this.week,
      home: { name: updatedMatch.home.name, score: this.homeNewScore.value },
      away: { name: updatedMatch.away.name, score: this.awayNewScore.value },
    };
    console.log('newScore:', newScore);
    this.newScoreStore.dispatch(NewScoreActions.sendNewScore({ newScore }));
    // Düzenleme modunu kapat
    updatedMatch.editMode = false;
  }
}
