import { Component, OnInit, Inject, LOCALE_ID, ViewChild } from '@angular/core';
import { HomeService } from './services/home.service';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { ToastService } from 'src/app/services/toast.service';
import { UrlService } from 'src/app/services/url.service';
import { LoginService } from '../../public/login/services/login.service';
import { ClipboardService } from 'ngx-clipboard';
import { ClientsService } from '../clients/services/clients.service';
import { DateService } from 'src/app/services/date.service';
import { MatDatepicker, MatDatepickerInputEvent } from '@angular/material/datepicker';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor(
    private HomeService: HomeService,
    private DatePipe: DatePipe,
    private Router: Router,
    private ToastService: ToastService,
    private LoginService: LoginService,
    private UrlService: UrlService,
    private ClipboardService: ClipboardService,
    private ClientService: ClientsService,
    @Inject(LOCALE_ID) private locale: string,
    public DateService: DateService
  ) { }
  shifts: any;
  clients: any[] = [];
  shiftIdSelected: any[] = [];
  submitUrl = false;
  date = new Date();
  dateNow = new Date();
  showResetDate = false;
  loading: Boolean = false;
  @ViewChild('picker') picker!: MatDatepicker<Date>;
  ngOnInit(): void {
    this.getShifts();
    this.getClientsToBirthday();
  }

  getShifts() {
    this.loading = true;
    const date = {
      start_date: this.DatePipe.transform(this.date, 'yyyy-MM-dd ') + '00:00:00',
      end_date: this.DatePipe.transform(this.date, 'yyyy-MM-dd ') + '23:59:59'
    };
    this.HomeService.getShifts(date).then((data: any) => {
      this.loading = false;
      this.shifts = data?.data;
    }).catch(e => {
      this.loading = false;
    })
  }

  nextDay() {
    this.showResetDate = true;
    const date = new Date(this.date.setDate(this.date.getDate() + 1));
    this.date = new Date(date.setHours(0, 0, 0, 0))
    this.getShifts();
    this.getClientsToBirthday();
  }

  BeforeDay() {
    this.showResetDate = true;
    const date = new Date(this.date.setDate(this.date.getDate() - 1));
    this.date = new Date(date.setHours(0, 0, 0, 0))
    this.getShifts();
    this.getClientsToBirthday();
  }

  goDate() {
    this.showResetDate = false;
    const date = new Date();
    this.date = new Date(date.setHours(0, 0, 0, 0));
    this.getShifts();
    this.getClientsToBirthday();
    this.picker.select(this.date)
  }

  setDate(event: any) {
    this.date = event?.value;
    this.getFormattedDate();
    this.getShifts();
    const date = new Date();
    const dateNow = new Date(date.setHours(0, 0, 0, 0))
    const datePage = new Date(this.date);
    if (dateNow.getTime() == datePage.getTime())
      this.showResetDate = false;
    else
      this.showResetDate = true;
  }
  getFormattedDate() {
    const dateFormat = "EEEE, d 'de' MMMM 'del' yyyy";

    const datePipe = new DatePipe(this.locale);
    return datePipe.transform(this.date, dateFormat);
  }

  getClientsToBirthday() {
    this.ClientService.getClients({
      date_birthday: this.DatePipe.transform(this.date, 'yyyy-MM-dd')
    }).then((client: any) => {
      this.clients = client?.data?.clients;
    }).catch(e => {

    });
  }

  createUrl() {
    this.submitUrl = true;
    this.UrlService.setUrl({
      user_id: this.LoginService.getDataUser().data?.id
    }).then((data: any) => {
      this.submitUrl = false;
      this.ClipboardService.copyFromContent(data?.data?.url + '/' + data?.data?.id);
      this.ToastService.showToastNew(
        '',
        "URL copiada en portapapeles",
        'success'
      );
    }).catch(e => {
      this.submitUrl = false;
    });
  }

  addShift() {
    this.Router.navigate(['in/shifts/create-shift'], { queryParams: { date: this.date } });
  }

  selectedShift(data: any) {
    if (data?.checked) {
      this.shiftIdSelected.push(data?.shifts);
    } else {
      const index = this.shiftIdSelected.indexOf(data?.shifts);
      if (index !== -1) {
        this.shiftIdSelected.splice(index, 1);
      }
    }
  }

  goToViewShifts() {
    this.Router.navigate(['/in/shifts/view-shift'], { queryParams: { shifts: btoa(JSON.stringify(this.shiftIdSelected)) } })
  }
}
