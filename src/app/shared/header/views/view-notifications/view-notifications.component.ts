import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import { IntShift } from 'src/app/interfaces/shift/int-shift';
import { DiaryService } from 'src/app/pages/in/diary/services/diary.service';
import { HeaderService } from '../../services/header.service';

@Component({
  selector: 'app-view-notifications',
  templateUrl: './view-notifications.component.html',
  styleUrls: ['./view-notifications.component.scss']
})
export class ViewNotificationsComponent implements OnInit{
  constructor(
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: IntShift[],
    private DiaryService : DiaryService,
    public HeaderService: HeaderService) { }
    shifts : any[] = [];

  ngOnInit(): void {
    this.shifts = this.DiaryService.groupShiftsByDate(this.data);
  }
}
