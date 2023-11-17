import { Component,OnInit } from '@angular/core';
import { ClientsService } from './services/clients.service';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss']
})
export class ClientsComponent implements OnInit{

constructor(
  private ClientsService:ClientsService
  ){}

columns = [
  'id',
  'name',
  'email',
  'phone',
  'date_brithday',
  'created_at'
];
clients : any[]= [];

ngOnInit(): void {
  this.getClients();
}

getClients(){
  this.ClientsService.getClients().then((clients:any) =>{
    this.clients = clients?.data?.clients;
  });
}
}
