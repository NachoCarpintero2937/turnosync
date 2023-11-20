import { Component, ViewChild, OnInit, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { DateAdapter, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatCalendar } from '@angular/material/datepicker';
import { DiaryService } from './services/diary.service';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { MatCalendarCellCssClasses } from '@angular/material/datepicker';
@Component({
  selector: 'app-diary',
  templateUrl: './diary.component.html',
  styleUrls: ['./diary.component.scss'],
  providers: [{ provide: MAT_DATE_LOCALE, useValue: 'es-AR' }],
})
export class DiaryComponent implements OnInit, AfterViewInit {
  @ViewChild('matcalendar') calendar!: MatCalendar<any>;
  date!: Date;
  // Define una función para determinar las clases de estilo de las celdas del calendario

  constructor(
    private dateAdapter: DateAdapter<Date>,
    private DiaryService: DiaryService,
    private Router: Router,
    private DatePipe: DatePipe
  ) {
    this.dateAdapter.setLocale('es-AR');
  }
  events: Date[] = [];
  shifts: any[] = [];
  shiftToCards: any[] = [];
  filter_date:any;
  ngOnInit(): void {
    this.getShifts();
  }

  onDateSelect(event: any): void {
    this.filter_date = this.DatePipe.transform(event, 'yyyy-MM-dd');
    this.getShifts();
    this.date = event;
  }
  onMonthSelect(event: any) {
    // Este método se ejecutará cuando se cambie de mes
    console.log('Mes seleccionado:', event);
  }
  onYearSelect(event: any) {
    // Este método se ejecutará cuando se cambie de año
    console.log('Año seleccionado:', event);
  }

  getShifts() {
    var filter = {};
    // if(!this.filter_date){
    //   const nextMonth = new Date();
    //   nextMonth.setMonth(nextMonth.getMonth() + 1);
    //   filter = {
    //     start_date: this.DatePipe.transform(new Date().setDate(1),'yyyy-MM-dd'),
    //     end_date: this.DatePipe.transform(nextMonth,'yyyy-MM-dd'),
    //   };
    // }
    this.DiaryService.getShifts(filter)
      .then((data: any) => {
        this.shifts = data?.data?.shifts;
        this.shiftToCards = data?.data?.shifts;
        this.calendar.updateTodaysDate();
      })
      .catch((e) => { });
  }

  dateClass = (date: Date): MatCalendarCellCssClasses => {
    const highlightDate = this.shifts.find((event: any) => {
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
