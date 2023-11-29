import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {Subscription} from 'rxjs';
import { ShiftsService } from '../../services/shifts.service';
@Component({
  selector: 'app-view-shift',
  templateUrl: './view-shift.component.html',
  styleUrls: ['./view-shift.component.scss']
})
export class ViewShiftComponent implements OnInit, OnDestroy{
  id: any;
private subscriptions: Subscription = new Subscription();
date!: Date;
shift:any;
constructor(
  private ActivatedRouter: ActivatedRoute,
  private ShiftsService: ShiftsService
  ){
}

ngOnInit(): void {
  this.initComponent();
}

ngOnDestroy(): void {
this.subscriptions.unsubscribe();  
}

// INIT //
initComponent(){
  this.subscriptions.add(
  this.ActivatedRouter.queryParams.subscribe((params :any) => {
  this.id = params?.id;
  this.date = params?.date;
  this.getShift();
  }));

}

getShift(){
 this.ShiftsService.getShifts({ id: this.id}).then((shift: any)=>{
  this.shift = shift?.data?.shifts[0];
 })
}
}
