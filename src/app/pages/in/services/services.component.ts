import { Component } from '@angular/core';
import { ServicesService } from './services/services.service';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss']
})
export class ServicesComponent {
  constructor(private ServicesService: ServicesService){

  }

  columns = [
    'id',
    'name',
    'price',
    'user',
    'created_at',
    'updated_at',
    'actions'
  ];
  services : any[]= [];
  
  ngOnInit(): void {
    this.getServices();
  }
  
  getServices(){
    this.ServicesService.getServices().then((services:any) =>{
      this.services = services?.data?.services;
    });
  }

  }

