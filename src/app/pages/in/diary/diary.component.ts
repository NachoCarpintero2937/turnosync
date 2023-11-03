import { Component } from '@angular/core';
import { DateAdapter, MAT_DATE_LOCALE } from '@angular/material/core';

@Component({
  selector: 'app-diary',
  templateUrl: './diary.component.html',
  styleUrls: ['./diary.component.scss'],
  providers: [{ provide: MAT_DATE_LOCALE, useValue: 'es-AR' }],
})
export class DiaryComponent {
  constructor(private dateAdapter: DateAdapter<Date>) {
    this.dateAdapter.setLocale('es-AR');
  }

  onDateSelect(event: Date): void {
    const selectedDate = event;
    console.log(selectedDate);
  }
}
