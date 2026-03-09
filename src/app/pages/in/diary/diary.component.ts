import { Component, ViewChild, OnInit, AfterViewInit } from '@angular/core';
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
import { DialogConfirmComponent } from 'src/app/shared/dialog-confirm/dialog-confirm.component';
import { MatDialog } from '@angular/material/dialog';
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
    private DateService: DateService,
    private ToastService: ToastService,
    private dialog: MatDialog,
  ) {
    this.dateAdapter.setLocale('es-AR');
  }
  events: Date[] = [];
  shifts: any;
  dateNow = new Date();
  filter_date = new Date();
  loading!: Boolean;
  shiftsCalendar: any[] = [];
  enumShift!: EnumStatusShift;
  isDateBefore!: boolean;
  submitStatus!: boolean;

  // Optimización: Caché mensual y de renderizado
  monthShifts: any[] = [];
  currentMonthKey: string = '';

  ngOnInit(): void {
    this.date = new Date(); // Asignar fecha actual por defecto
    this.getShifts(this.filter_date, false);
  }

  onDateSelect(event: any): void {
    this.date = event;
    this.filter_date = new Date(event);
    this.validateDate();
    this.getShifts(this.filter_date, false);
  }

  validateDate() {
    if (isBefore(new Date(this.date), new Date(this.filter_date))) {
      this.isDateBefore = true;
    } else {
      this.isDateBefore = false;
    }
  }

  getShifts(date: any, outDate?: boolean) {
    this.loading = true;
    const targetDate = date ? new Date(date) : new Date();
    const monthKey = targetDate.getFullYear() + '-' + targetDate.getMonth();

    if (this.currentMonthKey !== monthKey || this.monthShifts.length === 0) {
      // Necesitamos fetchear el mes desde la API (Optimizado: solo este mes)
      const dateRange = this.DateService.getMonthDateRange(targetDate);
      const filter = {
        start_date: dateRange.startDate,
        end_date: dateRange.endDate,
      };

      this.DiaryService.getShifts(filter)
        .then((data: any) => {
          this.monthShifts = data?.data?.shifts || [];
          this.shiftsCalendar = this.monthShifts; // Para que el calendario lila pinte los puntos de este mes
          this.currentMonthKey = monthKey;

          this.processDisplayShifts(targetDate, outDate);

          if (this.calendar) {
            this.calendar.updateTodaysDate();
          }
        })
        .catch((e) => {
          console.error('Error fetching shifts:', e);
          this.loading = false;
        });
    } else {
      // Ya tenemos los turnos de este mes en memoria, filtrar localmente sin demoras (Instantáneo)
      this.processDisplayShifts(targetDate, outDate);
    }
  }

  processDisplayShifts(date: Date, isDayFilter: boolean = false) {
    let shiftsToDisplay = this.monthShifts;
    if (isDayFilter) {
      shiftsToDisplay = this.monthShifts.filter((shift: any) => {
        const shiftDate = new Date(shift.date_shift);
        return this.isSameDay(shiftDate, date);
      });
    }

    this.shifts = this.DiaryService.groupShiftsByDate(shiftsToDisplay);
    this.loading = false;
  }

  dateClass = (date: Date): MatCalendarCellCssClasses => {
    const highlightDate = this.shiftsCalendar.find((event: any) => {
      const dateShift = new Date(event?.date_shift);
      return this.isSameDay(dateShift, date);
    });

    return highlightDate
      ? { 'highlight-event': true, 'event-content': this.getEventContent(date) }
      : '';
  };

  getEventContent(date: Date): string {
    const event = this.monthShifts.find((event: any) =>
      this.isSameDay(new Date(event?.date_shift), date),
    );
    return event
      ? `${event.client.name} ${this.DatePipe.transform(event.date_shift, 'HH:mm')}`
      : '';
  }

  private isSameDay(date1: Date, date2: Date): boolean {
    return (
      date1.getDate() === date2.getDate() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getFullYear() === date2.getFullYear()
    );
  }

  addShift() {
    this.Router.navigate(['in/shifts/create-shift'], {
      queryParams: { date: this.date },
    });
  }

  getDate(date: Date) {
    this.getShifts(date, true);
  }

  changeStatus(data: any) {
    const dialogRef = this.dialog.open(DialogConfirmComponent, {
      data: { shift: data?.shift, status: data?.status },
      width: '20%',
    });
    dialogRef.afterClosed().subscribe((modalData) => {
      if (modalData?.confirm) {
        this.goChangeStatus(
          data?.shift,
          data?.status,
          modalData?.price,
          modalData?.payment_method,
        );
      }
    });
  }

  goChangeStatus(data: any, status: any, price: any, payment_method?: any) {
    if (!this.submitStatus) {
      this.submitStatus = true;
      const dataStatus = {
        id: data?.id,
        status: status,
        price: price,
        payment_method: payment_method,
      };
      this.DiaryService.setStatus(dataStatus)
        .then((shift) => {
          this.submitStatus = false;
          this.ToastService.showToastNew(
            '',
            'Turno ' +
              (status == 1 ? 'confirmado' : 'cancelado') +
              ' correctamente',
            'success',
          );
          // Forzar refresh desde API para este mes
          this.currentMonthKey = '';
          this.getShifts(this.filter_date);
        })
        .catch((e: any) => {
          this.submitStatus = false;
        });
    }
  }

  ngAfterViewInit() {}
}
