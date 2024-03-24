import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-clients-birthday',
  templateUrl: './clients-birthday.component.html',
  styleUrls: ['./clients-birthday.component.scss']
})
export class ClientsBirthdayComponent  implements OnChanges{
  @Input() clients!: any;
  constructor(private ModalService: ModalService) { }

  showBirthdayCard:any
  sendWsp(client: any) {
    this.ModalService.getModalWsp(client);
  }

  ngOnChanges(): void {
    this.showBirthdayCard = this.clients.some((client:any) => this.calculateAge(client.date_birthday) > 0);
  }

  calculateAge(birthdate: Date): number {
    const today = new Date();
    const birthDate = new Date(birthdate);

    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    // Si el día actual es anterior al día de nacimiento, resta un año
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }

    return age;
  }
}
