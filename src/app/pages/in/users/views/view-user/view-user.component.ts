import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-view-user',
  templateUrl: './view-user.component.html',
  styleUrls: ['./view-user.component.scss']
})
export class ViewUserComponent implements OnInit{
  roles : any[] = [];
  constructor(
    private UsersService: UsersService,
    private ToastService : ToastService
    ){}

  ngOnInit(): void {
  this.getRoles();
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
