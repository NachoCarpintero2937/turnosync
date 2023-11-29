import { Injectable } from '@angular/core';
import { format, startOfMonth, endOfMonth } from 'date-fns';
@Injectable({
  providedIn: 'root'
})
export class DateService {

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
}
