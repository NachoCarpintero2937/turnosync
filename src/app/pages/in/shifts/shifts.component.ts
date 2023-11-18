import { Component,OnInit } from '@angular/core';
import { ShiftsService } from './services/shifts.service';

@Component({
  selector: 'app-shifts',
  templateUrl: './shifts.component.html',
  styleUrls: ['./shifts.component.scss']
})
export class ShiftsComponent implements OnInit{
  columns = [
    'id',
    'client',
    'date_shift',
    'description',
    'service',
    'created_at',
    'user',
    'actions'
  ];
  shifts : any[]= [];

  constructor(private ShiftsService :  ShiftsService){}
  
  ngOnInit(): void {
   this.getShifts();
  }

  getShifts(){
    this.ShiftsService.getShifts().then((data:any) =>{
      this.shifts = data?.data?.shifts;
    }).catch(e =>{

    });
  }
  
}
