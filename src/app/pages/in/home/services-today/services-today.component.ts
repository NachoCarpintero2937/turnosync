import { Component,Input } from '@angular/core';

@Component({
  selector: 'app-services-today',
  templateUrl: './services-today.component.html',
  styleUrls: ['./services-today.component.scss']
})
export class ServicesTodayComponent {
@Input() shifts:any;
}
