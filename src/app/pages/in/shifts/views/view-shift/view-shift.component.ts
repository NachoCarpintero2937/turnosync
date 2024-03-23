import { ChangeDetectorRef, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ShiftsService } from '../../services/shifts.service';
import { EnumStatusShift } from 'src/app/enums/shiftStatus.enum';
import { ToastService } from 'src/app/services/toast.service';
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
    private cdr: ChangeDetectorRef,
    private ToastService: ToastService,
    private Router: Router
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
        if(this.id)
        this.getShift();
      }));

  }

  getShift() {
    this.ShiftsService.getShifts({ id: this.id}).then((shift: any) => {
      this.shift = shift?.data?.shifts[0];
      if(!shift?.data?.shifts?.length){
        this.ToastService.showToastNew('','Turno no encontrado', 'error');
        this.Router.navigate(['/in/home']);
      }
    })
  }

  getLoading(event: boolean) {
    this.loading = event;
    this.cdr.detectChanges();
  }
}
