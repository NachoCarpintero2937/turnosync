import { Component } from '@angular/core';
import { UsersService } from './services/users.service';
import { Router } from '@angular/router';

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
    'rol',
    'created_at',
  ];
  users : any[]= [];

  constructor(
    private UsersService :  UsersService,
    private Router : Router
    ){}
  
  ngOnInit(): void {
   this.getUsers();
  }

  getUsers(){
    this.UsersService.getUsers().then((data:any) =>{
      this.users = data?.data?.users;
    }).catch(e =>{

    });
  }

  goToNewUser(){
    this.Router.navigate(['/in/users/view-user'])
  }
}
