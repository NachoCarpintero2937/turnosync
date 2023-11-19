import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {Subscription} from 'rxjs';
@Component({
  selector: 'app-view-shift',
  templateUrl: './view-shift.component.html',
  styleUrls: ['./view-shift.component.scss']
})
export class ViewShiftComponent implements OnInit, OnDestroy{

private subscriptions: Subscription = new Subscription();
date!: Date;
constructor(private ActivatedRouter: ActivatedRoute){

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
  this.date = params?.date;
  }));

}

}
