import { Component, OnInit } from '@angular/core';
import { ShiftsService } from '../shifts/services/shifts.service';
import { ActivatedRoute } from '@angular/router';
import { ClientsService } from '../clients/services/clients.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  shifts: any[] = [];
  client_id: any;
  client:any;
  loading! :boolean;
  quantityShifts :any;
  constructor(
    public ShiftsService: ShiftsService,
    private ActivatedRoute: ActivatedRoute,
    private ClientService: ClientsService
    ) { }

  ngOnInit(): void {
    this.ActivatedRoute.queryParams.subscribe((params:any) =>{
      this.client_id = params?.client;
      this.getClient();
      this.getShifts();
    })
  }

  getClient(){
    this.loading = true
    this.ClientService.getClients({id: this.client_id}).then((data:any)=>{
      this.loading =false;
     this.client = data?.data?.clients[0];
    }).catch(e =>{
      this.loading =false;
    })
  }


  getShifts() {
    this.ShiftsService.getShifts({
      client_id : this.client_id
    }).then((data: any) => {
      this.shifts = data?.data?.shifts;
      this.quantityShifts = {
        cancelled: this.shifts.filter((shift :any) =>  shift?.status == 2),
        show: this.shifts.filter((shift :any) =>  shift?.status == 1),
        pending: this.shifts.filter((shift :any) =>  shift?.status == 0)
      }
    }).catch(e => {

    });
  }
}
