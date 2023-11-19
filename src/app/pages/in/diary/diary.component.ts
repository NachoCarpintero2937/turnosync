import { Component, ViewChild, OnInit, AfterViewInit } from '@angular/core';
import { DateAdapter, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatCalendar } from '@angular/material/datepicker';
import { DiaryService } from './services/diary.service';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-diary',
  templateUrl: './diary.component.html',
  styleUrls: ['./diary.component.scss'],
  providers: [{ provide: MAT_DATE_LOCALE, useValue: 'es-AR' }],
})
export class DiaryComponent implements OnInit, AfterViewInit {
  @ViewChild('matcalendar') calendar!: MatCalendar<any>;
  date! : Date;
  constructor(
    private dateAdapter: DateAdapter<Date>,
    private DiaryService: DiaryService,
    private Router: Router,
    private DatePipe : DatePipe
  ) {
    this.dateAdapter.setLocale('es-AR');
  }

  shifts!: any;
  ngOnInit(): void {
    this.getShifts();
  }

  onDateSelect(event: Date): void {
  this.date= event;
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
    const date = {
      start_date: '2023-11-01 00:00:00',
      end_date: '2023-11-31 00:00:00',
    };
    this.DiaryService.getShifts(date)
      .then((data: any) => {
        this.shifts = data?.data?.shifts;
      })
      .catch((e) => {});
  }

  addShift(){
    this.Router.navigate(['in/shifts/create-shift'] ,{ queryParams : { date : this.date}});
  }
 
  ngAfterViewInit() {
    // this.calendar.stateChanges.subscribe((data) => {});
    // console.log(this.calendar.selectedChange);
    // this.calendar.selectedChange.subscribe((data) => {
    //   console.log(data);
    // });
  }

}
