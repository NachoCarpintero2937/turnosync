import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MobileService } from 'src/app/services/mobile.service';
import { TimepickerService } from 'src/app/services/timepicker.service';
import { UsersService } from '../../../users/services/users.service';
import { map, startWith } from 'rxjs';
import { ShiftsService } from '../../services/shifts.service';
import { ToastService } from 'src/app/services/toast.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-selected-shifts',
  templateUrl: './view-selected-shifts.component.html',
  styleUrls: ['./view-selected-shifts.component.scss']
})
export class ViewSelectedShiftsComponent implements OnInit {
  @Input() shifts: any
  users: any;
  submitBtn!: boolean;
  constructor(
    private FormBuilder: FormBuilder,
    private TimePicker: TimepickerService,
    private MobileService: MobileService,
    private UsersService: UsersService,
    private ShiftService: ShiftsService,
    private ToastService: ToastService,
    private Router: Router
  ) { }
  shiftDecode: any;
  isMobile = this.MobileService.isMobile();
  dateNow = new Date();
  dybellaTheme = this.TimePicker.getConfiguration();

  searchCtrlUsers = new FormControl();
  filteredUsers!: any[];
  form = this.FormBuilder.group({
    ids: ['', Validators.required],
    date_shift: [this.dateNow, Validators.required],
    user_id: [null, Validators.required]
  })


  ngOnInit(): void {
    this.shiftDecode = { shifts: JSON.parse(window.atob(this.shifts)) };
    this.getUsers();
    this.getShifts();
  }

  getShifts() {
    var idsString = this.shiftDecode.shifts.map((data: any) => data.id).join(',').toString();
    this.form.get('ids')?.setValue(idsString);
  }

  submit() {
    this.submitBtn = true;
    this.ShiftService.setShiftSelected(this.form.getRawValue()).then((data: any) => {
      this.submitBtn = false;
      if (data?.data?.message)
        this.ToastService.showToastNew(
          '',
          data?.data?.message + " " +
          "(" + data?.data?.data.toString() + ")",
          'info'
        );
      else
        this.ToastService.showToastNew(
          '',
          data?.message,
          'success'
        );

      this.Router.navigate(['/in/home']);
    }).catch((e) => {
      this.submitBtn = false;
    })
  }


  getUsers() {
    this.UsersService.getUsers().then((users: any) => {
      this.users = users?.data?.users;
      this.searchMat();
    })
  }

  searchMat() {
    this.filteredUsers = this.users;
    this.searchCtrlUsers.valueChanges.pipe(
      startWith(''),
      map((search) => this.ShiftService.filterItems(this.users, search))
    ).subscribe((filteredUsers) => {
      this.filteredUsers = filteredUsers;
    });
  }
}
