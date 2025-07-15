import { Component,Input,OnInit } from '@angular/core';
import { ShiftsService } from './services/shifts.service';
import { ActivatedRoute, Router } from '@angular/router';

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
    'user',
    'actions'
  ];
  shifts : any[]= [];
  constructor(
    private ShiftsService :  ShiftsService,
    private Router: Router
    ){}
  
  ngOnInit(): void {

   this.getShifts();
  }

  getShifts(){
    this.ShiftsService.getShifts().then((data:any) =>{
      this.shifts = data?.data?.shifts;
    }).catch(e =>{

    });
  }
  addShift(){
    this.Router.navigate(['in/shifts/create-shift'])
  }
}
