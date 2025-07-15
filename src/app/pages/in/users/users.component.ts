import { Component } from '@angular/core';
import { UsersService } from './services/users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent {
  columns = [
    'id',
    'name',
    'email',
    'created_at',
  ];
  users : any[]= [];

  constructor(private UsersService :  UsersService){}
  
  ngOnInit(): void {
   this.getUsers();
  }

  getUsers(){
    this.UsersService.getUsers().then((data:any) =>{
      this.users = data?.data?.users;
    }).catch(e =>{

    });
  }
}
