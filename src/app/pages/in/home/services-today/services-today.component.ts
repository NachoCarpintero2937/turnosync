import { Component,Input } from '@angular/core';

@Component({
    selector: 'app-services-today',
    templateUrl: './services-today.component.html',
    styleUrls: ['./services-today.component.scss'],
    standalone: false
})
export class ServicesTodayComponent {
@Input() shifts:any;
}
