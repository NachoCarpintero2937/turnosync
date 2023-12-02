import { Component, OnInit } from '@angular/core';
import { HomeService } from './services/home.service';
import { MatDialog } from '@angular/material/dialog';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { DiaryService } from '../diary/services/diary.service';
import { ToastService } from 'src/app/services/toast.service';
import { EnviromentService } from 'src/app/services/enviroment.service';
import { UrlService } from 'src/app/services/url.service';
import { LoginService } from '../../public/login/services/login.service';
import { ClipboardService } from 'ngx-clipboard';
import { ClientsService } from '../clients/services/clients.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor(
    private HomeService: HomeService,
     private DatePipe: DatePipe,
     private Router : Router,
     private ToastService: ToastService,
     private LoginService : LoginService,
     private UrlService : UrlService,
     private ClipboardService: ClipboardService,
     private ClientService : ClientsService,
     ) {}
  shifts: any;
  clients: any[]=[];
  submitUrl =false;
  date= new Date();
  ngOnInit(): void {
    this.getShifts();
    this.getClientsToBirthday();
  }

  getShifts() {
    const end_date  =  new Date();
    const date = {
      start_date: this.DatePipe.transform(this.date, 'yyyy-MM-dd ') + '00:00:00',
      end_date:this.DatePipe.transform(end_date, 'yyyy-MM-dd ') + '23:59:59'
    };
    this.HomeService.getShifts(date).then((data: any) => {
      this.shifts = data?.data;
    });
  }

  getClientsToBirthday(){
    const now = new Date();
    this.ClientService.getClients({
      date_birthday : this.DatePipe.transform(now,'yyyy-MM-dd' )
    }).then((client:any)=>{
      this.clients = client?.data?.clients;
    }).catch(e =>{

    });
  }

  createUrl(){
    this.submitUrl = true;
    this.UrlService.setUrl({
      user_id : this.LoginService.getDataUser().data?.id
    }).then((data : any)=>{
      this.submitUrl =false;
      this.ClipboardService.copyFromContent(data?.data?.url+ '/' + data?.data?.id);
      this.ToastService.showToastNew(
        '',
        "URL copiada en portapapeles",
        'success'
      );
    }).catch(e =>{
      this.submitUrl =false;
    }); 
  }

  addShift(){
    this.Router.navigate(['in/shifts/create-shift'], { queryParams: { date: this.date } });
  }


 
}
