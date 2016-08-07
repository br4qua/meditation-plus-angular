import { Component, forwardRef } from '@angular/core';
import { UserService } from '../user/user.service';
import { Observable } from 'rxjs/Rx';
import { ActivatedRoute } from '@angular/router';
import { CHART_DIRECTIVES } from 'ng2-charts/ng2-charts';
import { AppState } from '../';
import { AvatarDirective } from './';
import { LinkyPipe } from 'angular2-linky/linky-pipe';

@Component({
  selector: 'profile',
  template: require('./profile.html'),
  directives: [CHART_DIRECTIVES, forwardRef(() => AvatarDirective)],
  pipes: [LinkyPipe],
  styles: [
    require('./profile.css')
  ]
})
export class ProfileComponent {

  profile;
  notFound: boolean = false;
  updated: boolean = false;

  // chart details
  chartData: Array<any> = [];
  chartLabels: String[] = [];
  chartOptions = {
    animations: true,
    maintainAspectRatio: false,
    responsive: true
  };

  constructor(
    public userService: UserService,
    public route: ActivatedRoute,
    public appState: AppState
  ) {
    this.appState.set('title', 'Profile');
  }

  ngOnInit() {
    this.route.params.subscribe(res => this.load(res));
  }

  load(params) {
    this.notFound = false;
    this.userService.getProfile(params.id)
    .map(res => res.json())
    .subscribe(
      res => {
        this.profile = res;

        // gather chart data
        let data = {data: [], label: 'Minutes meditated'};
        for (let key of Object.keys(this.profile.meditations)) {
          this.chartLabels.push(key);
          data.data.push(
            this.profile.meditations[key]
          );
        }
        this.chartData.push(data);
      },
      err => {
        if (err.status === 404 || err.status === 400) {
          this.notFound = true;
          return;
        }
        console.error(err);
      }
    );
  }

  escape(html: string): string {
    return (<any>document.createElement('a').appendChild(
      document.createTextNode(html)
    ).parentNode).innerHTML;
  }

  get userId() {
    return window.localStorage.getItem('id');
  }
}
