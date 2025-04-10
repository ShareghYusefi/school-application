import { Component, Input } from '@angular/core';

@Component({
  selector: 'undergrads',
  standalone: false,
  templateUrl: './undergrads.component.html',
  styleUrl: './undergrads.component.css',
})
export class UndergradsComponent {
  // accepting an array of students using @Input decorator
  @Input() undergradsList!: any[];
}
