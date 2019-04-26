import { Component } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'milestone2';

  currentYear: number = moment().year();
  get years(): number[] {
    let result: number[] = [], min = 2005, max = moment().year();
    for (let i = min; i < max + 1; i++) {
      result.push(i);
    }
    return result;
  }

  currentMonth: number = moment().month() + 1;
  get months(): number[] {
    let result: number[] = [], min = 1, max = 12;
    for (let i = min; i < max + 1; i++) {
      result.push(i);
    }
    return result;
  }

  thisMonth() {
    this.currentYear = moment().year();
    this.currentMonth = moment().month() + 1;
  }

  lastMonth() {
    this.currentYear = moment().year();
    this.currentMonth = moment().month();
  }

  weekStart: string = "m";
  selectedWeek: string = this.currentWeek;
  get currentWeek(): string {
    return this.getWeek(moment());
  }
  showFromPreviousMonth: boolean = true;

  getWeek(date: moment.Moment): string {
    let w: moment.Moment = this.startOfWeek(date);

    let n: number = w.week();
    return `CK${n} (${w.format('DD.MM')}-${w.add(6, 'days').format('DD.MM')})`;
  }

  get weeks(): string[] {
    let result: string[] = [];
    let selectedDate = moment([this.currentYear, this.currentMonth - 1]);
    let endOfMonth = moment(selectedDate).endOf('month');

    console.log(this.startOfWeek(selectedDate).month());

    if (this.startOfWeek(selectedDate).month() == selectedDate.month() || this.showFromPreviousMonth)
      result.push(this.getWeek(selectedDate));

    while (selectedDate.add(7, 'days').diff(endOfMonth) < 0) {
      if (this.startOfWeek(selectedDate).month() == selectedDate.month() || this.showFromPreviousMonth)
        result.push(this.getWeek(selectedDate));
    }

    return result;
  }


  startOfWeek(date: moment.Moment): moment.Moment {
    let w: moment.Moment;
    if (this.weekStart == "s") {
      w = moment(date).startOf('week');
    } else {
      w = moment(date).startOf('isoWeek');
    }
    return w;
  }

  thisWeek() {
    let currentDate = moment();
    this.setWeekDate(currentDate);
  }

  lastWeek() {
    let currentDate = moment().add(-7, 'days');
    this.setWeekDate(currentDate);
  }

  setWeekDate(date: moment.Moment){
    this.currentYear = date.year();
    this.currentMonth = date.month() + 1;
    this.selectedWeek = this.getWeek(date);
  }
}