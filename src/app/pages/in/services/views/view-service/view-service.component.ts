import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ServicesService } from '../../services/services.service';

@Component({
  selector: 'app-view-service',
  templateUrl: './view-service.component.html',
  styleUrls: ['./view-service.component.scss']
})
export class ViewServiceComponent implements OnInit {
  constructor(
    private ActivatedRouter: ActivatedRoute,
    private ServiceService: ServicesService
  ) { }
  id!: string;
  service: any;

  ngOnInit(): void {
    this.initComponent();
  }

  initComponent() {
    this.ActivatedRouter.queryParamMap.subscribe((data: any) => {
      this.id = data?.params?.id;
      this.getService();
    });

  }
  getService() {
    this.ServiceService.getServices({ id: this.id }).then((data: any) => {
      this.service = data?.data?.services[0];
    });
  }
}
