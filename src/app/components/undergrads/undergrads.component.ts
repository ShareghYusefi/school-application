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

  // define 'childEvent' event used to emit data to parent component via @Output decorator
  @Output() childEvent = new EventEmitter();

  // define function to emit the data to parent component
  sendDataToParent() {
    this.childEvent.emit('This is the data from child component!');
  }
}
