import { Component } from '@angular/core';
import { UsersService } from './services/users.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent {
  columns = [
    'name',
    'email',
    'rol',
    'created_at',
    'actions',
  ];
  columnRoles = [
    'name',
    'actions'
  ]
  users : any[]= [];
  role!: boolean;
  roles : any[] = [];
  constructor(
    private UsersService :  UsersService,
    private Router : Router,
    private ActivateRoute: ActivatedRoute
    ){}
  
  ngOnInit(): void {
    this.ActivateRoute.params.subscribe((params:any) => {
      this.role = !!params?.role;
      if(this.role)
      this.getRoles();
    });
   this.getUsers();
  }

  getUsers(){
    this.UsersService.getUsers().then((data:any) =>{
      this.users = data?.data?.users;
    }).catch(e =>{

    });
  }

  getRoles(){
    this.UsersService.getRoles().then((data:any) =>{
      this.roles = data?.data?.roles;
    }).catch(e =>{

    });
  }
  goTo(path : string){
    this.Router.navigate([path]);
  }
}
