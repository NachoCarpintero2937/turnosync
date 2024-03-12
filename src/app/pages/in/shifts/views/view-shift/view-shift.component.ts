import { ChangeDetectorRef, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { ShiftsService } from '../../services/shifts.service';
import { EnumStatusShift } from 'src/app/enums/shiftStatus.enum';
@Component({
  selector: 'app-view-shift',
  templateUrl: './view-shift.component.html',
  styleUrls: ['./view-shift.component.scss']
})
export class ViewShiftComponent implements OnInit, OnDestroy {
  id: any;
  private subscriptions: Subscription = new Subscription();
  date!: Date;
  shift: any;
  shifts: any[] = [];
  client: any;
  loading: boolean = false;
  shiftEnum!: EnumStatusShift;
  constructor(
    private ActivatedRouter: ActivatedRoute,
    private ShiftsService: ShiftsService,
    private cdr: ChangeDetectorRef
  ) {
  }

  ngOnInit(): void {
    this.initComponent();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  // INIT //
  initComponent() {
    this.subscriptions.add(
      this.ActivatedRouter.queryParams.subscribe((params: any) => {
        this.shifts = params.shifts;
        this.client = params?.client
        this.id = params?.id;
        this.date = params?.date;
        this.getShift();
      }));

  }

  getShift() {
    this.ShiftsService.getShifts({ id: this.id }).then((shift: any) => {
      this.shift = shift?.data?.shifts[0];
    })
  }

  getLoading(event: boolean) {
    this.loading = event;
    this.cdr.detectChanges();
  }
}
