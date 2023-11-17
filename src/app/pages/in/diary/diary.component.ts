import { Component, ViewChild, OnInit, AfterViewInit } from '@angular/core';
import { DateAdapter, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatCalendar } from '@angular/material/datepicker';
import { DiaryService } from './services/diary.service';
import { DatePipe } from '@angular/common';
import { DialogWspComponent } from 'src/app/shared/dialog-wsp/dialog-wsp.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-diary',
  templateUrl: './diary.component.html',
  styleUrls: ['./diary.component.scss'],
  providers: [{ provide: MAT_DATE_LOCALE, useValue: 'es-AR' }],
})
export class DiaryComponent implements OnInit, AfterViewInit {
  @ViewChild('matcalendar') calendar!: MatCalendar<any>;
  constructor(
    private dateAdapter: DateAdapter<Date>,
    private DiaryService: DiaryService,
    private DatePipe: DatePipe,
    private dialog: MatDialog
  ) {
    this.dateAdapter.setLocale('es-AR');
  }

  shifts!: any;
  ngOnInit(): void {
    this.getShifts();
  }

  onDateSelect(event: Date): void {
    const selectedDate = event;
    console.log(selectedDate);
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
  getTootlip(shift: any) {
    const tooltip =
      shift?.service?.name +
      ' a ' +
      shift?.client?.name +
      ' el día ' +
      this.DatePipe.transform(shift?.date_shift, 'dd/MM/yyyy') +
      ' a las ' +
      this.DatePipe.transform(shift?.date_shift, 'HH:mm');
    return tooltip;
  }
  ngAfterViewInit() {
    // this.calendar.stateChanges.subscribe((data) => {});
    // console.log(this.calendar.selectedChange);
    // this.calendar.selectedChange.subscribe((data) => {
    //   console.log(data);
    // });
  }

  sendWsp(shift: any) {
    const dialogRef = this.dialog.open(DialogWspComponent, {
      data: { shift: shift },
      width: '50%',
    });
    dialogRef.afterClosed().subscribe((resultado) => {});
  }
}
