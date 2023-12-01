import { Component, ViewChild, OnInit, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { DateAdapter, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatCalendar } from '@angular/material/datepicker';
import { DiaryService } from './services/diary.service';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { MatCalendarCellCssClasses } from '@angular/material/datepicker';
import { DateService } from 'src/app/services/date.service';
import { EnumStatusShift } from 'src/app/enums/shiftStatus.enum';
import { ToastService } from 'src/app/services/toast.service';
import { isBefore } from 'date-fns';
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
    private DateService : DateService,
    private ToastService : ToastService
  ) {
    this.dateAdapter.setLocale('es-AR');
  }
  events: Date[] = [];
  shifts: any;
  filter_date = new Date();
  loading!:Boolean;
  shiftsCalendar: any[]= [];
  enumShift!: EnumStatusShift;
  isDateBefore! :boolean;
  ngOnInit(): void {
    this.getShifts(this.filter_date,false);
  }

  onDateSelect(event: any): void {
    this.date = event;
    this.filter_date = new Date(event);
    this.validateDate();
    this.getShifts(this.filter_date);
  }

  validateDate() {
    if (isBefore(new Date(this.date), new Date(this.filter_date))) {
      this.isDateBefore = true;
    } else {
      this.isDateBefore = false;
    }
    console.log(this.isDateBefore)
  }

  getShifts(date?: any,outDate? :boolean) {
    this.loading = true;
    this.shifts = [];
    
    var filter = {};
      const dateRange = !outDate ? this.DateService.getMonthDateRange(date) : this.DateService.getDayRange(date)
      filter = {
        start_date: dateRange.startDate,
        end_date: dateRange.endDate
      };

    this.DiaryService.getShifts(filter)
      .then((data: any) => {
        this.shifts = this.DiaryService.groupShiftsByDate(data?.data?.shifts);
        this.AllShifts();
      })
      .catch((e) => {
        console.error("Error fetching shifts:", e);
      });
  }        

  AllShifts(){
    this.DiaryService.getShifts()
    .then((data: any) => {
      this.shiftsCalendar = data?.data?.shifts;
      this.calendar.updateTodaysDate();
      this.loading = false;
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

  getDate(date:Date){
  this.getShifts(date,true);
  }

  goChangeStatus(data:any){
    const dataStatus = {
      id : data?.shift?.id,
      status: data?.status
    }
    this.DiaryService.setStatus(dataStatus).then((shift) =>{
      this.ToastService.showToastNew(
        '',
        "Turno " + (data?.status == 1 ? 'confirmado' : 'cancelado') + ' correctamente',
        'success'
      );
      this.getShifts(this.filter_date);
    }).catch((e:any) =>{

    })
  }


  ngAfterViewInit() {

  }

}
