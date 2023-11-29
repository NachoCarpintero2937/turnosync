import { Component, OnInit } from '@angular/core';
import { HomeService } from './services/home.service';
import { DialogWspComponent } from 'src/app/shared/dialog-wsp/dialog-wsp.component';
import { MatDialog } from '@angular/material/dialog';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor(
    private HomeService: HomeService,
     private dialog: MatDialog,
     private DatePipe: DatePipe,
     private Router : Router) {}
  shifts: any;
  date= new Date();
  ngOnInit(): void {
    this.getShifts();
  }

  getShifts() {
    const end_date  =  new Date().setDate(this.date.getDate() + 1);
    const date = {
      start_date: this.DatePipe.transform(this.date, 'yyyy-MM-dd ') + '00:00:00',
      end_date:this.DatePipe.transform(end_date, 'yyyy-MM-dd ') + '00:00:00'
    };
    this.HomeService.getShifts(date).then((data: any) => {
      this.shifts = data?.data;
    });
  }

  sendWsp(shift: any) {
    const dialogRef = this.dialog.open(DialogWspComponent, {
      data: { shift: shift },
      width: '50%',
    });
    dialogRef.afterClosed().subscribe((resultado: any) => {});
  }

  getTooltip() {
    return '';
  }

  addShift(){
    this.Router.navigate(['in/shifts/create-shift'], { queryParams: { date: this.date } });
  }
}
