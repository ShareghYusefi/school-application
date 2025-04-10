import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'undergrads',
  standalone: false,
  templateUrl: './undergrads.component.html',
  styleUrl: './undergrads.component.css',
})
export class UndergradsComponent {
  // accepting an array of students using @Input decorator
  @Input() undergradsList!: any[];

  // define 'deleteEvent' event used to emit data to parent component via @Output decorator
  @Output() deleteEvent = new EventEmitter();

  // define function to emit the data to parent component
  delete(id: number) {
    this.deleteEvent.emit(id);
  }
}
