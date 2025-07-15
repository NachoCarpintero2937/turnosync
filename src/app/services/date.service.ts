import { DatePipe } from '@angular/common';
import { Injectable } from '@angular/core';
import { format, startOfMonth, endOfMonth } from 'date-fns';
@Injectable({
  providedIn: 'root'
})
export class DateService {
  constructor(private DatePipe: DatePipe){}

  getMonthDateRange(date: any): { startDate: string, endDate: string } {
    const currentDate = date;
    
    // Get the first day of the current month
    const firstDayOfMonth = startOfMonth(currentDate);
    
    // Get the last day of the current month
    const lastDayOfMonth = endOfMonth(currentDate);

    // Format the dates in the desired format (yyyy-MM-dd)
    const startDate = format(firstDayOfMonth, 'yyyy-MM-dd HH:mm:ss');
    const endDate = format(lastDayOfMonth, 'yyyy-MM-dd HH:mm:ss');

    return { startDate, endDate };
  }

  getDayRange(date:any):{ startDate: string, endDate: string }{
    const startDate = this.DatePipe.transform(date,'yyyy-MM-dd') + ' 00:00:00';
    const endDate =  this.DatePipe.transform(date,'yyyy-MM-dd') + ' 23:58:59';

    return { startDate, endDate };
  }

  areDatesEqual(date1: Date, date2: Date): boolean {
    return date1.getTime() === date2.getTime();
  }

  isDate1BeforeDate2(date1: Date, date2: Date): boolean {
    return date1.getTime() < date2.getTime();
  }

  isDate1AfterDate2(date1: Date, date2: Date): boolean {
    return date1.getTime() > date2.getTime();
  }
}
