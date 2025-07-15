import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UrlService } from 'src/app/services/url.service';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss']
})
export class ClientsComponent implements OnInit {
  constructor(
    private UrlService: UrlService,
    private ActivatedRoute: ActivatedRoute
  ) { }
  id!: any;
  showForm = false;
  loading = false;
  ngOnInit(): void {
    this.initComponent();
  }

  initComponent() {
    this.ActivatedRoute.paramMap.subscribe((r: any) => {
      this.id = r?.params?.id
      if (this.id)
        this.getValidUrl();
    });
  }

  getValidUrl() {
    this.loading = true;
    this.UrlService.getUrl({ id :this.id}).then((data: any)=>{
      this.showForm  = true;
      this.loading = false;
    }).catch(e =>{
      this.showForm = false;
      this.loading = false;
    });
  }
} 
