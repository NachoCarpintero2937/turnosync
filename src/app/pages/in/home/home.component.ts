import { Component, OnInit, Inject, LOCALE_ID, ViewChild } from '@angular/core';
import { HomeService } from './services/home.service';
import { DatePipe } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastService } from 'src/app/services/toast.service';
import { UrlService } from 'src/app/services/url.service';
import { LoginService } from '../../public/login/services/login.service';
import { ClipboardService } from 'ngx-clipboard';
import { ClientsService } from '../clients/services/clients.service';
import { DateService } from 'src/app/services/date.service';
import { MatDatepicker, MatDatepickerInputEvent } from '@angular/material/datepicker';
import { DiaryService } from '../diary/services/diary.service';

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
    public DateService: DateService,
    private ActivatedRoute: ActivatedRoute,
    private DiaryService: DiaryService
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
  timer: any;
  Allshift: [] = []
  datesWithShifts: Set<string> = new Set();

  ngOnInit(): void {
    this.ActivatedRoute.queryParams.subscribe((params) => {
      const dateParam = params['date'];
      if (dateParam) {
        const [year, month, day] = dateParam.split('-').map(Number);
        this.date = new Date(year, month - 1, day);
        this.showResetDate = true;
      }
    });

    this.getShifts();
    this.getClientsToBirthday();
    document.addEventListener('keydown', this.onKeyDown.bind(this));
    this.AllShifts();
  }

  AllShifts() {
    this.DiaryService.getShifts()
      .then((data: any) => {
        this.Allshift = data?.data?.shifts;
        this.loading = false;
        this.updateDatesWithShifts()
      })
      .catch((e) => {
        console.error("Error fetching shifts:", e);
      });
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
    });
  }

  dateClass = (date: Date) => {
    const dateString = this.DatePipe.transform(date, 'yyyy-MM-dd');
    return dateString && this.datesWithShifts.has(dateString) ? 'date-with-shift' : '';
  }

  private updateDatesWithShifts() {
    this.datesWithShifts.clear();
    if (this.Allshift.length) {
      this.Allshift.forEach((shift: any) => {
        const shiftDate = this.DatePipe.transform(new Date(shift.date_shift), 'yyyy-MM-dd');
        if (shiftDate) {
          this.datesWithShifts.add(shiftDate);
        }
      });
    }
  }

  updateUrl() {
    // Actualiza la URL con la fecha actual
    this.Router.navigate([], {
      queryParams: { date: this.DatePipe.transform(this.date, 'yyyy-MM-dd') },
      queryParamsHandling: 'merge', // Mantener otros parámetros existentes
    });
  }

  nextDay() {
    this.showResetDate = true;
    this.date.setDate(this.date.getDate() + 1);
    this.date.setHours(0, 0, 0, 0);
    this.updateUrl();
    clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      this.getShifts();
      this.getClientsToBirthday();
    }, 1000);
  }

  BeforeDay() {
    this.showResetDate = true;
    this.date.setDate(this.date.getDate() - 1);
    this.date.setHours(0, 0, 0, 0);
    this.updateUrl();
    clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      this.getShifts();
      this.getClientsToBirthday();
    }, 1000);
  }

  goDate() {
    clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      this.showResetDate = false;
      this.date = new Date();
      this.date.setHours(0, 0, 0, 0);
      this.updateUrl();
      this.getShifts();
      this.getClientsToBirthday();
    }, 1000);
  }

  setDate(event: any) {
    this.date = event?.value;
    this.date.setHours(0, 0, 0, 0);
    this.updateUrl();
    this.getShifts();
    this.getClientsToBirthday();
    this.showResetDate = this.date.toDateString() !== new Date().toDateString();
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

  onKeyDown(event: KeyboardEvent): void {
    if (event.key === 'ArrowLeft') {
      this.BeforeDay();
      // Tu lógica aquí...
    } else if (event.key === 'ArrowRight') {
      this.nextDay();
    } else if (event.key === 'Delete' || event.key === 'Backspace') {
      this.goDate();
    }
  }
}
