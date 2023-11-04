import { Component, OnInit } from '@angular/core';
import { HomeService } from './services/home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor(private HomeService: HomeService) {}

  employeesData: any;
  ngOnInit(): void {
    this.getEmployees();
  }

  getEmployees() {
    this.HomeService.getShiftToEmployees().then((data: any) => {
      this.employeesData = data?.data?.employees;
    });
  }
}
