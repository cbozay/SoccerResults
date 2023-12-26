import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import * as matchResultsAction from './store/actions/matchResults.actions';
import * as allMatchResultsAction from './store/actions/allMatchResults.action';
import * as championshipProbabilitiesAction from './store/actions/championshipProbabilities.action';
import { Team } from './interfaces/team';
import { BehaviorSubject, Observable, of } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  ngOnInit(): void {}

  //********************************** */
  constructor(
    private matchResultsStore: Store<{ matchResults: any[] }>,
    private championshipProbabilitiesStore: Store<{
      championshipProbabilities: { team: Team; probability: number }[];
    }>,
    private newScoreStore: Store<{ newScore: any }>
  ) {
    this.generateTeams();
    this.generateMatches();

    this.newScoreStore
      .pipe(select('newScore'))
      .subscribe((value) => (this.newScore = value));
    // console.log(this.newScore ?? {});
  }

  //********************************** */

  newScore: any;

  // Generating Teams start
  teams$: BehaviorSubject<Team[]> = new BehaviorSubject<Team[]>([]);

  generateTeams() {
    const teamNames: string[] = [
      'Beşiktaş',
      'Fenerbahçe',
      'Galatasaray',
      'Elazığspor',
    ];
    const teams = teamNames.map((name, index) => ({
      id: index + 1,
      name,
      points: 0,
      matchesPlayed: 0,
      wins: 0,
      draws: 0,
      losses: 0,
      goalDifference: 0,
      power: 0,
    }));
    this.teams$.next(teams);
  }
  // Generating Teams end

  //********************************** */

  // Generating matchSchedule start
  matchSchedule: [Team, Team][][] = [];
  currentWeekIndex = 0;

  generateMatches() {
    // her takıma rastgele güçler atanır
    const powerValues = [1, 2, 3, 4, 5]; // Güç değerleri

    for (let i = 0; i < this.teams$.getValue().length; i++) {
      this.teams$.getValue()[i].power =
        powerValues[Math.floor(Math.random() * powerValues.length)];
    }

    const weeks = this.teams$.getValue().length - 1;
    const firstHalfMatches: [Team, Team][][] = [];
    const secondHalfMatches: [Team, Team][][] = [];

    // İlk 3 haftalık maçları oluştur
    for (let week = 0; week < weeks; week++) {
      const matches: [Team, Team][] = [];

      for (let i = 0; i < this.teams$.getValue().length / 2; i++) {
        matches.push([
          this.teams$.getValue()[i],
          this.teams$.getValue()[this.teams$.getValue().length - 1 - i],
        ]);
      }

      this.teams$.getValue().splice(1, 0, this.teams$.getValue().pop() as Team);
      firstHalfMatches.push(matches);
    }

    // İlk 3 hafta sonunda takımları yer değiştirerek ikinci 3 haftalık maçları oluştur
    for (let week = 0; week < weeks; week++) {
      const matches: [Team, Team][] = [];

      for (const match of firstHalfMatches[week]) {
        matches.push([match[1], match[0]]); // Takımları yer değiştirerek eşleştir
      }

      secondHalfMatches.push(matches);
    }

    // İki seti birleştir
    const combinedMatches = [...firstHalfMatches, ...secondHalfMatches];

    // Karıştır
    const shuffledMatches = this.shuffleArray(combinedMatches);

    this.matchSchedule = shuffledMatches;
    console.log(this.matchSchedule);
  }

  shuffleArray(arr: any[]) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }
  // Generating matchSchedule end

  //********************************** */

  // playing matches start
  currentWeekMatchResults: any[] = [];
  championshipProbabilities: { team: Team; probability: number }[] = [];

  simulateMatches() {
    if (this.currentWeekIndex >= this.matchSchedule.length) {
      console.log('Tüm haftalar tamamlandı!');
      return;
    }

    const matches = this.matchSchedule[this.currentWeekIndex];

    this.currentWeekMatchResults = [];

    for (const match of matches) {
      const home = match[0];
      const away = match[1];

      // const homeScore = Math.floor(Math.random() * 5);
      // const awayScore = Math.floor(Math.random() * 5);
      const homeScore = Math.floor(
        Math.random() * home.power + Math.random() * 1
      );
      const awayScore = Math.floor(
        Math.random() * away.power + Math.random() * 1
      );

      this.currentWeekMatchResults.push({
        week: this.currentWeekIndex + 1, // Hafta numarası
        home: {
          name: home.name,
          score: homeScore,
        },
        away: {
          name: away.name,
          score: awayScore,
        },
      });

      home.matchesPlayed++;
      away.matchesPlayed++;
      home.goalDifference += homeScore - awayScore;
      away.goalDifference += awayScore - homeScore;

      if (homeScore > awayScore) {
        home.points += 3;
        home.wins++;
        away.losses++;
      } else if (homeScore < awayScore) {
        away.points += 3;
        away.wins++;
        home.losses++;
      } else {
        home.points += 1;
        away.points += 1;
        home.draws++;
        away.draws++;
      }

      // console.log(this.currentWeekMatchResults);
    }

    this.currentWeekIndex++;
    this.updateTable();
    this.calculateChampionshipProbabilities();

    // console.log(this.championshipProbabilities);
    // this.championshipProbabilitiesStore.dispatch(
    //   championshipProbabilitiesAction.sendChampionshipProbabilities({
    //     championshipProbabilities: this.championshipProbabilities,
    //   })
    // );
  }

  calculateChampionshipProbabilities() {
    const remainingWeeks = this.matchSchedule.length - this.currentWeekIndex;
    const topTeamPoints = this.teams$.getValue()[0].points;

    const totalPointsExceptTopTeam = this.teams$
      .getValue()
      .slice(1)
      .reduce((total, t) => total + t.points, 0);

    this.championshipProbabilities = this.teams$
      .getValue()
      .map((team, index) => {
        if (index !== 0) {
          const potentialPoints = team.points + remainingWeeks * 3;
          if (potentialPoints >= topTeamPoints) {
            const remainingProbability =
              100 - (topTeamPoints / totalPointsExceptTopTeam) * 100;
            const probability = Math.max(
              0,
              (team.points / totalPointsExceptTopTeam) * remainingProbability
            );
            return { team, probability };
          } else {
            return { team, probability: 0 };
          }
        } else {
          return { team, probability: 0 };
        }
      });

    // En üstteki takımın olasılığını düzenle
    const topTeamProbability =
      100 -
      this.championshipProbabilities.reduce(
        (total, t) => total + t.probability,
        0
      );
    this.championshipProbabilities[0].probability = Math.max(
      0,
      topTeamProbability
    );

    this.championshipProbabilities.sort(
      (a, b) => b.probability - a.probability
    );
  }
  // playing matches end

  //********************************** */

  updateTable() {
    const updatedTeams = this.teams$.getValue().slice(); // Mevcut değeri alıyoruz

    updatedTeams.sort((a, b) => {
      if (b.points !== a.points) {
        return b.points - a.points; // Puanlara göre sırala
      } else if (b.goalDifference !== a.goalDifference) {
        return b.goalDifference - a.goalDifference; // Averaja göre sırala
      } else {
        return a.name.localeCompare(b.name); // İsimlere göre sırala
      }
    });

    this.teams$.next(updatedTeams); // Sıralanmış yeni değeri next metoduyla yayınlıyoruz

    this.matchResultsStore.dispatch(
      matchResultsAction.sendMatchResults({
        results: this.currentWeekMatchResults,
      })
    );
  }

  isLowProbability(team: Team, index: number): boolean {
    // Takımın puan durumunu ve kalan hafta sayısını alalım
    const remainingWeeks = this.matchSchedule.length - this.currentWeekIndex;
    const sortedTeams = this.teams$
      .getValue()
      .slice()
      .sort((a, b) => b.points - a.points);
    const currentTeam = sortedTeams[index];
    const topTeamPoints = sortedTeams[0].points;

    // Belirli koşulu sağlayan takımların satır rengini değiştirelim
    return (
      remainingWeeks > -1 &&
      currentTeam.points + remainingWeeks * 3 < topTeamPoints
    );
  }

  allMatchResults: any[] = [];
  showMatchResults = false;
  isPlaying: boolean = false; // Başlangıçta butonun etkin olduğu durumu varsayalım

  playAllMatches() {
    this.allMatchResults = [];

    this.isPlaying = true; // Butona tıklandığında butonu devre dışı bırak

    while (this.currentWeekIndex < this.matchSchedule.length) {
      const matches = this.matchSchedule[this.currentWeekIndex];
      const weekMatches = [];

      for (const match of matches) {
        const home = match[0];
        const away = match[1];

        const homeScore = Math.floor(Math.random() * 5);
        const awayScore = Math.floor(Math.random() * 5);

        weekMatches.push({
          week: this.currentWeekIndex + 1,
          home: { name: home.name, score: homeScore },
          away: { name: away.name, score: awayScore },
        });

        home.matchesPlayed++;
        away.matchesPlayed++;
        home.goalDifference += homeScore - awayScore;
        away.goalDifference += awayScore - homeScore;

        if (homeScore > awayScore) {
          home.points += 3;
          home.wins++;
          away.losses++;
        } else if (homeScore < awayScore) {
          away.points += 3;
          away.wins++;
          home.losses++;
        } else {
          home.points += 1;
          away.points += 1;
          home.draws++;
          away.draws++;
        }
      }

      this.allMatchResults.push(weekMatches);
      this.currentWeekIndex++;

      this.updateTable();
    }

    this.currentWeekIndex = 0;
    this.showMatchResults = true;

    this.matchResultsStore.dispatch(
      allMatchResultsAction.sendAllMatchResults({
        results: this.allMatchResults,
      })
    );
  }

  //********************************** */
}
