import { Component } from '@angular/core';
import { ToastService } from 'src/app/services/toast.service';
import { ClientsService } from '../clients/services/clients.service';
import { CapmaignsService } from './services/capmaigns.service';

@Component({
    selector: 'app-campaings',
    templateUrl: './campaings.component.html',
    styleUrls: ['./campaings.component.scss'],
    standalone: false
})
export class CampaingsComponent {

  subHeaderTitle: string = "Campañas de publicidad";
  // sales: IntSale[];
  emails  : any;
  phones :any;
  submitForm: boolean = false;
  constructor(
    private CapmaignsService: CapmaignsService,
    private ToastService: ToastService,
    private ClientService : ClientsService
  ) { }

  ngOnInit(): void {
    this.getClients();
  }

  getClients() { 
    this.ClientService.getClients().then((data: any) => { 
     this.phones = this.ClientService.getPhonesByClients(data?.data?.clients);
    });
  }

  submit(event: any) {
    this.submitForm = true;
    this.CapmaignsService.sendCampaings(event).then((data: any) => {
      this.submitForm = false;
      this.ToastService.showToastNew(
        '',
        data?.message,
        'success'
      );
    }).catch((e:any) => {
      this.submitForm = false;
    })
}
}
