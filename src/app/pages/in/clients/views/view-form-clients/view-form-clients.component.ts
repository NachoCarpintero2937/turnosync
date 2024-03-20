import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ClientsService } from '../../services/clients.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UrlService } from 'src/app/services/url.service';
import { LoginService } from 'src/app/pages/public/login/services/login.service';
import { NgxPermissionsService } from 'ngx-permissions';
@Component({
  selector: 'app-view-form-clients',
  templateUrl: './view-form-clients.component.html',
  styleUrls: ['./view-form-clients.component.scss']
})
export class ViewFormClientsComponent implements OnChanges, OnInit {
  constructor(
    private fb: FormBuilder,
    private ClientsService: ClientsService,
    private Router: Router,
    private UrlService: UrlService,
    private LoginService: LoginService,
    private ActivateRoute: ActivatedRoute,
    private NgxPermissionsService: NgxPermissionsService
  ) { }
  @Input() client!: any
  @Input() idUrl!: any;
  @Input() companyId !: string
  submitForm = false;
  loading = true;
  toShift = false;
  dateNow = new Date();
  form = this.fb.group({
    id: [null],
    name: [null, Validators.required],
    email: [null, [Validators.email]],
    confirm_email: [null,[Validators.email]],
    phone: [null, [Validators.required, Validators.pattern(/^\d{8}$/)]],
    cod_area: ["11", [Validators.required, Validators.pattern(/^\d+$/)]],
    date_birthday: [new Date()],
    company_id : ['']
  });

  ngOnChanges() {
    this.initComponent()
  }
  ngOnInit(): void {
    this.ActivateRoute.queryParams.subscribe((data: any) => {
      this.toShift = data?.toShift;
    });

  this.form.get('confirm_email')?.valueChanges.subscribe(email =>{
    if(email !== this.form.get('email')?.value){
      this.form.get('confirm_email')?.setErrors({ 'mismatch': true });
    }else{
      this.form.get('confirm_email')?.setErrors(null);
    }
  })
  }
  hasPermission(permission: string) {
    return this.NgxPermissionsService.getPermission(permission);
  }
  initComponent() {
    if (this.client) {
      this.setValue();
    }

    if (this.idUrl) {
      this.setValidators();
    }
    // set company_id
    this.form.get('company_id')?.setValue(this.companyId);
  }

  setValidators() {
    this.form.get('date_birthday')?.setValidators([Validators.required])
  }

  setValue() {
    this.loading = false;
    this.form.get('id')?.setValue(this.client?.id);
    this.form.get('name')?.setValue(this.client?.name);
    this.form.get('email')?.setValue(this.client?.email);
    this.form.get('phone')?.setValue(this.client?.phone);
    this.form.get('cod_area')?.setValue(this.client?.cod_area);

    const dateNow = new Date(this.client?.date_birthday);
    dateNow.setDate(dateNow.getDate() + 1)
    this.form.get('date_birthday')?.setValue(dateNow);

  }

  submit() {
    this.submitForm = true;
    this.ClientsService.setClients(this.form.getRawValue()).then((data: any) => {
      this.submitForm = false;
      if (this.idUrl && !this.toShift)
        this.Router.navigate(['/thanks'])
      else if (this.toShift && !this.idUrl)
        this.Router.navigate(['/in/shifts/create-shift'],{queryParams : {client : data?.data?.client?.id}});
      else
        this.Router.navigate(['in/clients']);

      if (this.idUrl) {
        this.goUpdateUrl();
      } else {

      }
    }).catch(e => {
      this.submitForm = false;
    })
  }

  goUpdateUrl() {
    this.UrlService.setUrl({
      id: this.idUrl,
      user_id: this.LoginService.getDataUser().data?.id
    }).then((data: any) => {
    }).catch(e => {

    });
  }
}
