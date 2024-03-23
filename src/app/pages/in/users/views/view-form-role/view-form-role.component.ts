import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatChipSelectionChange } from '@angular/material/chips';
import { UsersService } from '../../services/users.service';
import { Router } from '@angular/router';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-view-form-role',
  templateUrl: './view-form-role.component.html',
  styleUrls: ['./view-form-role.component.scss']
})
export class ViewFormRoleComponent implements OnChanges {
  @Input() permissions : any;
  @Input() role!: string;
  roleParsed : any;
  selectedPermiss:string[] = [];
  constructor(
    private FormBuilder: FormBuilder,
    private UsersService: UsersService,
    private Router: Router,
    private ToastService : ToastService
    ) { }

  formRole = this.FormBuilder.group({
    id: [],
    name: ['', Validators.required],
    permissions: [[''], Validators.required]
  });

  ngOnChanges(): void {
    if(this.role){
      this.roleParsed = JSON.parse(this.role!);
      this.setValue();
    }
  }

  selected(name:string) : boolean{
    const rol = this.roleParsed.permissions.map((permission:any) => permission?.name);
   return  rol.some((rol:string) => name == rol);
  }

  setValue(){
    const rol  = this.roleParsed?.permissions.map((permission:any) => permission?.name);
    this.formRole.get('id')?.setValue(this.roleParsed?.id);
    this.formRole.get('name')?.setValue(this.roleParsed?.name);
    this.formRole.get('permissions')?.setValue(rol);
  }

  submit(){
    console.log(this.formRole.getRawValue())
    this.UsersService.setRole(this.formRole.getRawValue()).then((data:any)=>{
    this.ToastService.showToastNew('',data?.message,'success');
     this.Router.navigate(['in/users/role']);
    })
  }

}
