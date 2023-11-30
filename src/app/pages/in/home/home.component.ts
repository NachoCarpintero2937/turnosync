import { Component, OnInit } from '@angular/core';
import { HomeService } from './services/home.service';
import { DialogWspComponent } from 'src/app/shared/dialog-wsp/dialog-wsp.component';
import { MatDialog } from '@angular/material/dialog';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { DiaryService } from '../diary/services/diary.service';
import { ToastService } from 'src/app/services/toast.service';
import { EnviromentService } from 'src/app/services/enviroment.service';
import { UrlService } from 'src/app/services/url.service';
import { LoginService } from '../../public/login/services/login.service';
import { ClipboardService } from 'ngx-clipboard';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor(
    private HomeService: HomeService,
     private dialog: MatDialog,
     private DatePipe: DatePipe,
     private Router : Router,
     private DiaryService: DiaryService,
     private ToastService: ToastService,
     private EnviromentService: EnviromentService,
     private LoginService : LoginService,
     private UrlService : UrlService,
     private ClipboardService: ClipboardService) {}
  shifts: any;
  submitStatus! : boolean;
  date= new Date();
  ngOnInit(): void {
    this.getShifts();
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

  sendWsp(shift: any) {
    const dialogRef = this.dialog.open(DialogWspComponent, {
      data: { shift: shift },
      width: '50%',
    });
    dialogRef.afterClosed().subscribe((data: any) => {
      if(data){
        const dataToWsp = {
          cod_area : data?.shift?.client?.cod_area,
          phone : data?.shift?.client?.phone,
          message : data?.message
        }
        this.EnviromentService.goToWsp(dataToWsp);
      };
    });
  }

  createUrl(){
    this.UrlService.setUrl({
      user_id : this.LoginService.getDataUser().data?.id
    }).then((data : any)=>{
      this.ClipboardService.copyFromContent(data?.data?.url+ '/' + data?.data?.id);
      this.ToastService.showToastNew(
        '',
        "URL copiada en portapapeles",
        'success'
      );
    }).catch(e =>{

    }); 
  }

  getTooltip() {
    return '';
  }

  addShift(){
    this.Router.navigate(['in/shifts/create-shift'], { queryParams: { date: this.date } });
  }

  changeStatus(data:any,status:any){
    if(!this.submitStatus){
      this.submitStatus = true;
      const dataStatus = {
        id : data?.id,
        status: status
      }
      this.DiaryService.setStatus(dataStatus).then((shift) =>{
        this.submitStatus = false;
        this.ToastService.showToastNew(
          '',
          "Turno " + (status== 1 ? 'confirmado' : 'cancelado') + ' correctamente',
          'success'
        );
        this.getShifts();
      }).catch((e:any) =>{
  
      })
    }
  }
}
