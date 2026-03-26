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
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import esLocale from '@fullcalendar/core/locales/es';

@Component({
  selector: 'app-diary',
  templateUrl: './diary.component.html',
  styleUrls: ['./diary.component.scss'],
  providers: [{ provide: MAT_DATE_LOCALE, useValue: 'es-AR' }],
  standalone: false,
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

  calendarEvents: any[] = [];

  calendarOptions: CalendarOptions = {
    initialView: 'timeGridWeek',
    plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
    locales: [esLocale],
    locale: 'es',
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay',
    },
    selectable: true,
    dateClick: this.handleDateClick.bind(this),
    eventClick: this.handleEventClick.bind(this),
    slotMinTime: '08:00:00',
    slotMaxTime: '22:00:00',
    allDaySlot: false,
    height: 'auto',
    expandRows: true,
    nowIndicator: true,
  };

  handleDateClick(arg: any) {
    this.date = arg.date;
    this.addShift();
  }

  handleEventClick(arg: any) {
    const shift = arg.event.extendedProps.shift;
    if (shift) {
      if (shift.status == 0) {
        // Si está PENDIENTE, abrir el modal para CONFIRMAR (status 1)
        this.changeStatus({
          shift: shift,
          status: 1, // Nuevo estado: Confirmado
        });
      } else if (shift.status == 1) {
        // Si ya está CONFIRMADO, mostrar solo un resumen
        this.showShiftSummary(shift);
      } else if (shift.status == 2) {
        // Si está CANCELADO, mostrar solo un resumen
        this.showShiftSummary(shift);
      }
    }
  }

  showShiftSummary(shift: any) {
    // Reutilizar el componente DialogConfirm u otro material dialog
    // para mostrar un resumen. Generando texto HTML para 'data.text'
    const summaryHtml = `
      <h3 style="margin-bottom:15px; color:#a58171; font-weight:600;">Resumen del Turno</h3>
      <div style="text-align: left; font-size: 16px; line-height: 1.5;">
        <p><b>Cliente:</b> ${shift.client?.name} ${shift.client?.last_name || ''}</p>
        <p><b>Servicio:</b> ${shift.service?.name}</p>
        <p><b>Profesional:</b> ${shift.employee?.name || 'No asignado'}</p>
        <p><b>Fecha y Hora:</b> ${this.DatePipe.transform(shift.date_shift, 'dd/MM/yyyy HH:mm')}</p>
        <p><b>Estado:</b> ${shift.status == 1 ? '<span style="color:#28a745">Confirmado</span>' : '<span style="color:#dc3545">Cancelado</span>'}</p>
        ${shift.price ? `<p><b>Precio:</b> $${shift.price}</p>` : ''}
        ${shift.payment_method ? `<p><b>Método de pago:</b> ${shift.payment_method}</p>` : ''}
        ${shift.description ? `<p><b>Observaciones:</b> ${shift.description}</p>` : ''}
      </div>
    `;

    this.dialog.open(DialogConfirmComponent, {
      data: { shift: shift, status: null, text: summaryHtml, isSummary: true },
      width: '400px',
    });
  }

  // Optimización: Caché mensual y de renderizado
  monthShifts: any[] = [];
  currentMonthKey: string = '';

  ngOnInit(): void {
    this.date = new Date(); // Asignar fecha actual por defecto
    this.getCalendarDates(this.date);
    this.getShifts(this.filter_date, false);
  }

  onDateSelect(event: any): void {
    this.date = event;
    this.filter_date = new Date(event);
    this.validateDate();
    this.getShifts(this.filter_date, true);
  }

  onMonthSelected(event: any): void {
    const selectedDate = new Date(event);
    this.getCalendarDates(selectedDate);
  }

  getCalendarDates(date: Date) {
    const filter = {
      month: date.getMonth() + 1,
      year: date.getFullYear(),
    };
    this.DiaryService.getCalendar(filter)
      .then((data: any) => {
        // Mapear las fechas a objetos que el calendario entienda
        this.shiftsCalendar = (data?.data?.dates || []).map((d: string) => ({
          date_shift: d,
        }));
        if (this.calendar) {
          this.calendar.updateTodaysDate();
        }
      })
      .catch((e) => console.error('Error loading calendar dates:', e));
  }

  validateDate() {
    if (isBefore(new Date(this.date), new Date(this.filter_date))) {
      this.isDateBefore = true;
    } else {
      this.isDateBefore = false;
    }
  }

  getShifts(date: any, isDayFilter: boolean = false) {
    this.loading = true;
    const targetDate = date ? new Date(date) : new Date();
    const monthKey = targetDate.getFullYear() + '-' + targetDate.getMonth();

    if (this.currentMonthKey !== monthKey || this.monthShifts.length === 0) {
      const dateRange = this.DateService.getMonthDateRange(targetDate);
      const filter = {
        start_date: dateRange.startDate,
        end_date: dateRange.endDate,
      };

      this.DiaryService.getShifts(filter)
        .then((data: any) => {
          this.monthShifts = data?.data?.shifts || [];
          this.currentMonthKey = monthKey;
          this.processDisplayShifts(targetDate, isDayFilter);
        })
        .catch((e) => {
          console.error('Error fetching shifts:', e);
          this.loading = false;
        });
    } else {
      this.processDisplayShifts(targetDate, isDayFilter);
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

    const fullCalendarEvents = this.monthShifts.map((shift: any) => {
      let backgroundColor = '#808080'; // PENDING, gris
      if (shift.status == 1)
        backgroundColor = '#28a745'; // SHOW, verde
      else if (shift.status == 2) backgroundColor = '#dc3545'; // CANCELLED, rojo

      return {
        id: shift.id,
        title: `${shift.client?.name || 'Cliente'} - ${shift.service?.name || 'Servicio'}`,
        start: shift.date_shift,
        backgroundColor: backgroundColor,
        borderColor: backgroundColor,
        extendedProps: {
          shiftId: shift.id,
          shift: shift,
        },
      };
    });

    this.calendarEvents = fullCalendarEvents;
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
