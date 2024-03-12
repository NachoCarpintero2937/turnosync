import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { LoginService } from 'src/app/pages/public/login/services/login.service';
import { NgxMaterialTimepickerTheme } from 'ngx-material-timepicker';
import { ServicesService } from '../../../services/services/services.service';
import { ClientsService } from '../../../clients/services/clients.service';
import { map, startWith } from 'rxjs';
import { DatePipe } from '@angular/common';
import { ShiftsService } from '../../services/shifts.service';
import { UsersService } from '../../../users/services/users.service';
import { Router } from '@angular/router';
import { ToastService } from 'src/app/services/toast.service';
import { TimepickerService } from 'src/app/services/timepicker.service';
import { MobileService } from 'src/app/services/mobile.service';
import { EnumStatusShift } from 'src/app/enums/shiftStatus.enum';
@Component({
  selector: 'app-view-form-shifts',
  templateUrl: './view-form-shifts.component.html',
  styleUrls: ['./view-form-shifts.component.scss']
})
export class ViewFormShiftsComponent implements OnInit, OnChanges {
  @Input() date!: any
  @Input() shift: any;
  @Input() client: any;
  @Output()loading = new EventEmitter();
  loadingForm = false;
  submitForm = false;
  dateTransform!: any;
  shiftStatus = EnumStatusShift;
  shiftsToClient :any= {
    shifts : []
  }
  dateNow = new Date()
  constructor(
    private fb: FormBuilder,
    private LoginService: LoginService,
    private ServicesService: ServicesService,
    private ClientService: ClientsService,
    private DatePipe: DatePipe,
    private ShiftService: ShiftsService,
    private UsersService: UsersService,
    private Router: Router,
    private ToastService: ToastService,
    private TimePicker: TimepickerService,
    private MobileService: MobileService
  ) { }

  form = this.fb.group({
    id: [null],
    date_shift: [this.date, Validators.required],
    hour: ['', Validators.required],
    description: [null],
    status: [0],
    price: [null, Validators.required],
    service_id: [null, Validators.required],
    client_id: [0, Validators.required],
    user_id: [null, Validators.required]
  });

  
  isMobile = this.MobileService.isMobile();

  dybellaTheme= this.TimePicker.getConfiguration();

  clients: any[] = [];
  services: any[] = [];
  users: any[] = [];

  searchCtrlClient = new FormControl();
  filteredClients!: any[];

  searchCtrlService = new FormControl();
  filteredService!: any[];

  searchCtrlUsers = new FormControl();
  filteredUsers!: any[];

  ngOnInit(): void {
    this.getServices();
    this.initComponent();
  }

  initComponent(){
    this.form.get('client_id')?.valueChanges.subscribe((client:any)=>{
      this.getShift(client);
    })
  }

  ngOnChanges(): void {
    if (this.shift) {
      this.setValueFromShift()
    } else {
      this.setValueForm();
    }    
  }

  setValueFromShift() {
    this.form.get('id')?.setValue(this.shift?.id)
    this.form.get('date_shift')?.setValue(new Date(this.shift?.date_shift));
    this.dateTransform = this.shift?.date_shift;
    this.form.get('hour')?.setValue(this.DatePipe.transform(this.shift?.date_shift, 'HH:mm'));
    this.form.get('description')?.setValue(this.shift?.description);
    // this.form.get('status').setValue();
    this.form.get('price')?.setValue(this.shift?.price);
    this.form.get('service_id')?.setValue(this.shift?.service_id);
    this.form.get('client_id')?.setValue(this.shift?.client_id);
    this.form.get('user_id')?.setValue(this.shift?.user_id);
    this.form.get('status')?.setValue(this.shift?.status);
  }

  setValueForm() {
    const date = new Date(this.date);
    this.form.get('date_shift')?.setValue(date);
    this.form.get('user_id')?.setValue(this.LoginService.getDataUser().data?.id);
    if(this.client){
      const intClient = parseInt(this.client);
      this.form.get('client_id')?.setValue(intClient);
    }

  }

  getShift(client?:any){
    this.shiftsToClient.shifts = [];
    this.ShiftService.getShifts({client_id : client}).then((shift:any)=>{
      this.shiftsToClient.shifts.push(shift?.data?.shifts[0]);
      console.log(this.shiftsToClient)
    })
  }

  getServices() {
    this.loadingForm = true;
    this.loading.emit(true);
    this.ServicesService.getServices().then((services: any) => {
      this.services = services.data?.services;
      this.getClients();
    })
  }

  getClients() {
    this.ClientService.getClients().then((clients: any) => {
      this.clients = clients?.data?.clients;
      this.getUsers();
    })
  }

  getUsers() {
    this.UsersService.getUsers().then((users: any) => {
      this.users = users?.data?.users;
      this.searchMat();
      this.loading.emit(false);
      this.loadingForm = false;
    })
  }


  searchMat() {
    this.filteredClients =[];
    this.searchCtrlClient.valueChanges.pipe(
      startWith(''),
      map((search) => this.ShiftService.filterItems(this.clients, search))
    ).subscribe((filteredClients) => {
      this.filteredClients = filteredClients;
    });

    this.filteredService = this.services;
    this.searchCtrlService.valueChanges.pipe(
      startWith(''),
      map((search) => this.ShiftService.filterItems(this.services, search))
    ).subscribe((filteredService) => {
      this.filteredService = filteredService;
    });

    this.filteredUsers = this.users;
    this.searchCtrlUsers.valueChanges.pipe(
      startWith(''),
      map((search) => this.ShiftService.filterItems(this.users, search))
    ).subscribe((filteredUsers) => {
      this.filteredUsers = filteredUsers;
    });

    this.form.get('hour')?.valueChanges.subscribe((hour: any) => {
      const date = this.form.get('date_shift')?.value;
      if (date && hour) {
        const fullDate = new Date(date);
        const [hours, minutes] = hour.split(':');
        fullDate.setHours(Number(hours));
        fullDate.setMinutes(Number(minutes));
        this.dateTransform = this.DatePipe.transform(fullDate, 'yyyy/MM/dd HH:mm:ss');
      }
    })

    this.form.get('date_shift')?.valueChanges.subscribe((date:any)=>{
      const hour = this.form.get('hour')?.value;
      if (date && hour) {
        const [hours, minutes] = hour.split(':');
        date.setHours(Number(hours));
        date.setMinutes(Number(minutes));
        this.dateTransform = this.DatePipe.transform(date, 'yyyy/MM/dd HH:mm:ss');
      }
    })
  }



  onSelect(type: string) {
    if (type == 'service') {
      this.searchCtrlService.setValue(null);
      this.filteredService = this.services;
      const price = this.services.find((service: any) => service?.id === this.form.get('service_id')?.value);
      this.form.get('price')?.setValue(price?.price?.price.replace('.00', ''));
    } else {
      this.searchCtrlClient.setValue(null);
      this.filteredClients = this.clients;
    }
  }

  submit() {
    this.submitForm = true;
    this.loading.emit(true);
    const data = this.ShiftService.mapToShift(this.form.getRawValue(), this.dateTransform);
    this.ShiftService.setShift(data).then((data) => {
      this.loading.emit(false);
      this.submitForm = false;
      this.Router.navigate(['/in/diary/']);
      this.ToastService.showToastNew(
        '',
        "Turno generado correctamente",
        'success'
      );
    }).catch(e => {
      this.loading.emit(false);
      this.submitForm = false;
    })
  }

  addClient(){
    this.Router.navigate(['/in/clients/create-client'], { queryParams: { toShift: true } });
  }
}
