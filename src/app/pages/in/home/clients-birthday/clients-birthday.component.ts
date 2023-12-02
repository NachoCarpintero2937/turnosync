import { Component,Input} from '@angular/core';

@Component({
  selector: 'app-clients-birthday',
  templateUrl: './clients-birthday.component.html',
  styleUrls: ['./clients-birthday.component.scss']
})
export class ClientsBirthdayComponent {
@Input() clients!:any;
}
