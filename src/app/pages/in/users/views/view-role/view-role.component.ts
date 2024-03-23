import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-view-role',
  templateUrl: './view-role.component.html',
  styleUrls: ['./view-role.component.scss']
})
export class ViewRoleComponent implements OnInit {
  constructor(
    private UsersService: UsersService,
    private ActivatedRoute: ActivatedRoute
    ) { }
  permiss!:any[];
  role!: any;
  ngOnInit(): void {
    this.ActivatedRoute.queryParamMap.subscribe((params:any)=>{
      this.role = params?.params?.role;
      this.getPermiss();
    });
  }

  getPermiss() {
    this.UsersService.getPermiss().then((permiss:any) => {
      this.permiss = permiss?.data;
    })
  }

}
