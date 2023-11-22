import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ClientsService } from '../../services/clients.service';

@Component({
  selector: 'app-view-clients',
  templateUrl: './view-clients.component.html',
  styleUrls: ['./view-clients.component.scss']
})
export class ViewClientsComponent implements OnInit{
constructor(
  private ActivatedRouter : ActivatedRoute,
  private ClientService: ClientsService
  ){}
id!:string;
client:any;
ngOnInit(): void {
  this.initComponent();
}

initComponent(){
  this.ActivatedRouter.queryParamMap.subscribe( (data:any) =>{
    this.id=data?.params?.id;
    this.getClient();
  });

}

getClient(){
  this.ClientService.getClients({id: this.id}).then((data:any)=>{
   this.client = data?.data?.clients[0];
  })
}
}
