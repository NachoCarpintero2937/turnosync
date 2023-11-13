import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-info-cards',
  templateUrl: './info-cards.component.html',
  styleUrls: ['./info-cards.component.scss'],
})
export class InfoCardsComponent {
  @Input() data: any;

  date = new Date();
}
