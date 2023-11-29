import { Component, ViewChild, OnInit, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { DateAdapter, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatCalendar } from '@angular/material/datepicker';
import { DiaryService } from './services/diary.service';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { MatCalendarCellCssClasses } from '@angular/material/datepicker';
import { DateService } from 'src/app/services/date.service';
@Component({
  selector: 'app-diary',
  templateUrl: './diary.component.html',
  styleUrls: ['./diary.component.scss'],
  providers: [{ provide: MAT_DATE_LOCALE, useValue: 'es-AR' }],
})
export class DiaryComponent implements OnInit, AfterViewInit {
  @ViewChild('matcalendar') calendar!: MatCalendar<any>;
  date!: Date;
  constructor(
    private dateAdapter: DateAdapter<Date>,
    private DiaryService: DiaryService,
    private Router: Router,
    private DatePipe: DatePipe,
    private DateService : DateService
  ) {
    this.dateAdapter.setLocale('es-AR');
  }
  events: Date[] = [];
  shifts: any;
  filter_date:any;
  shiftsCalendar: any[]= [];
  ngOnInit(): void {
    this.getShifts();
  }

  onDateSelect(event: any): void {
    this.date = event;
    this.filter_date = new Date(event);
    this.getShifts(this.filter_date);
  }

  getShifts(date?: any) {
    var filter = {};
    if (date) {
      const dateRange = this.DateService.getMonthDateRange(date);
      filter = {
        start_date: dateRange.startDate,
        end_date: dateRange.endDate
      };
    }
  
    this.DiaryService.getShifts(filter)
      .then((data: any) => {
        this.shifts = this.DiaryService.groupShiftsByDate(data?.data?.shifts);
        this.shiftsCalendar = data?.data?.shifts;
        console.log(this.shifts);
        this.calendar.updateTodaysDate();
      })
      .catch((e) => {
        console.error("Error fetching shifts:", e);
      });
  }

  dateClass = (date: Date): MatCalendarCellCssClasses => {
    const highlightDate = this.shiftsCalendar.find((event: any) => {
      const dateShift = new Date(event?.date_shift);
      return this.isSameDay(dateShift, date);
    });

    return highlightDate ? { 'highlight-event': true, 'event-content': this.getEventContent(date) } : '';
  }


  getEventContent(date: Date): string {
    const event = this.shifts.find((event: any) => this.isSameDay(new Date(event?.date_shift), date));
    return event ? `${event.client.name} ${this.DatePipe.transform(event.date_shift, 'HH:mm')}` : '';
  }

  private isSameDay(date1: Date, date2: Date): boolean {
    return (
      date1.getDate() === date2.getDate() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getFullYear() === date2.getFullYear()
    );
  }

  addShift() {
    this.Router.navigate(['in/shifts/create-shift'], { queryParams: { date: this.date } });
  }


  ngAfterViewInit() {
    // this.calendar.stateChanges.subscribe((data) => {});
    // console.log(this.calendar.selectedChange);
    // this.calendar.selectedChange.subscribe((data) => {
    //   console.log(data);
    // });
  }

}
