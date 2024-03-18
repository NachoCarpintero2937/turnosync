import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { ToastService } from 'src/app/services/toast.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-view-user',
  templateUrl: './view-user.component.html',
  styleUrls: ['./view-user.component.scss']
})
export class ViewUserComponent implements OnInit{
  roles : any[] = [];
  id!: string;
  user: any;
  constructor(
    private UsersService: UsersService,
    private ToastService : ToastService,
    private ActivateRoute: ActivatedRoute
    ){}

  ngOnInit(): void {
    this.ActivateRoute.queryParams.subscribe((params:any)=>{
      this.id = params?.id;
      if(this.id)
      this.getUsers();

      this.getRoles();
    })
  }

  getUsers(){
    this.UsersService.getUsers({id: this.id}).then((data:any) =>{
      this.user = data?.data?.users[0];
    })
  }

  getRoles(){
    this.UsersService.getRoles().then((roles:any) =>{
      this.roles = roles?.data?.roles;
    }).catch(e =>{

    })
  }

  goToApi(data:any){
    this.UsersService.setUser(data).then((user: any) =>{
      if(user?.status){
        this.ToastService.showToastNew(
          '',
          user?.message,
          'success'
        );
      }
    }).catch((e:any)=>{})
  }
}
