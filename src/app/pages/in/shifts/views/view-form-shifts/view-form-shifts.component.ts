import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { LoginService } from 'src/app/pages/public/services/login.service';
import { NgxMaterialTimepickerTheme }  from 'ngx-material-timepicker';
import { ServicesService } from '../../../services/services/services.service';
import { ClientsService } from '../../../clients/services/clients.service';
import { map, startWith } from 'rxjs';
import { DatePipe } from '@angular/common';
import { ShiftsService } from '../../services/shifts.service';
@Component({
  selector: 'app-view-form-shifts',
  templateUrl: './view-form-shifts.component.html',
  styleUrls: ['./view-form-shifts.component.scss']
})
export class ViewFormShiftsComponent implements OnInit{
  @Input() date!:any

 constructor(
  private fb : FormBuilder,
  private LoginService: LoginService,
  private ServicesService: ServicesService,
  private ClientService :ClientsService,
  private DatePipe : DatePipe,
  private ShiftService : ShiftsService
  ){}
  dybellaTheme: NgxMaterialTimepickerTheme = {
    container: {
        bodyBackgroundColor: '#fff',
        buttonColor: '#e1b6b6',
    },
    dial: {
        dialBackgroundColor: '#e1b6b6',
        
    },
    clockFace: {
        clockFaceBackgroundColor: '#e1b6b6',
        clockHandColor: '#a58171',
        clockFaceTimeInactiveColor: '#fff',
    }
};

clients : any[] = [];
services : any[] = [];

 form = this.fb.group({
  date_shift: [this.date,Validators.required],
  hour : [null,Validators.required],
  description : [null,Validators.required],
  status: [0, Validators.required],
  price : [null,Validators.required],
  service_id:[null,Validators.required],
  client_id : [null,Validators.required],
  user_id : [null,Validators.required]
 });
 searchCtrlClient = new FormControl();
 filteredClients!: any[];
 searchCtrlService= new FormControl();
 filteredService!: any[];
ngOnInit(): void {
  this.getServices();
  this.setValueForm();
}

setValueForm(){
  const date= new Date(this.date);
  this.form.get('date_shift')?.setValue(date);
  this.form.get('user_id')?.setValue(this.LoginService.getDataUser().data?.id)
}

getServices(){
  this.ServicesService.getServices().then((services:any) =>{
    this.services = services.data?.services;
    this.getClients();
  })
}

getClients(){
  this.ClientService.getClients().then((clients: any) =>{
    this.clients = clients?.data?.clients;
    this.searchMat();
  })
}

searchMat(){
  this.filteredClients = this.clients;
  this.searchCtrlClient.valueChanges.pipe(
    startWith(''),
    map((search) => this.filterClients(search))
  ).subscribe((filteredClients) => {
    this.filteredClients = filteredClients;
  });

  this.filteredService = this.services;
  this.searchCtrlService.valueChanges.pipe(
    startWith(''),
    map((search) => this.filterService(search))
  ).subscribe((filteredService) => {
    this.filteredService = filteredService;
  });

  this.form.get('hour')?.valueChanges.subscribe((hour:any)=>{
    const date = this.form.get('date_shift')?.value;
    if (date && hour) {
      const fullDate = new Date(date);
      const [hours, minutes] = hour.split(':');
      fullDate.setHours(Number(hours));
      fullDate.setMinutes(Number(minutes));
      const tranformDate = this.DatePipe.transform(fullDate, 'yyyy/MM/dd HH:mm:ss');
      this.form.get('date_shift')?.setValue(tranformDate);
    }
  })
}
filterClients(search: string): any[] {
  const filterValue = search;
  return this.clients.filter((client) => client.name.toLowerCase().includes(filterValue));
}
filterService(search: string): any[] {
  const filterValue = search;
  return this.services.filter((service) => service.name.toLowerCase().includes(filterValue));
}

onSelect(type:string){
  if(type == 'service'){
    this.searchCtrlService.setValue(null);
    this.filteredService = this.services;
    const price = this.services.find((service:any)  => service?.id  === this.form.get('service_id')?.value );
    this.form.get('price')?.setValue(price?.price?.price.replace('.00', ''));
  }else{
    this.searchCtrlClient.setValue(null);
    this.filteredClients = this.clients;
  }
}
submit(){
  this.ShiftService.setShift(this.form.getRawValue()).then((data) =>{
    console.log(data);
  })
}
}
