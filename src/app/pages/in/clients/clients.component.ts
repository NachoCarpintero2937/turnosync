import { Component,OnInit } from '@angular/core';
import { ClientsService } from './services/clients.service';
import { Router } from '@angular/router';
import { ToastService } from 'src/app/services/toast.service';
@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss']
})
export class ClientsComponent implements OnInit{

constructor(
  private ClientsService:ClientsService,
  private Router : Router,
  private ToastService : ToastService
  ){}

columns = [
  'id',
  'name',
  'email',
  'phone',
  'date_brithday',
  'actions'
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

addClient(){
  this.Router.navigate(['in/clients/create-client']);
}

destroy(data:any){
 this.ClientsService.deleteClient(data).then((r:any)=>{
  this.ToastService.showToastNew(
    '',
    r?.message,
    'success'
  );
  this.getClients();
 }).catch((e : any)=>{
 });
}

}
