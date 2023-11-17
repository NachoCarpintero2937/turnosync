import { Component, OnInit } from '@angular/core';
import { HomeService } from './services/home.service';
import { DialogWspComponent } from 'src/app/shared/dialog-wsp/dialog-wsp.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor(private HomeService: HomeService, private dialog: MatDialog) {}
  shifts: any;

  ngOnInit(): void {
    this.getShifts();
  }

  getShifts() {
    const date = {
      start_date: '2023-11-01 00:00:00',
      end_date: '2023-11-31 00:00:00',
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
}
