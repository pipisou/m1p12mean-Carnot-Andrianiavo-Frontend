import { Component , Input, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-slidebar',
  imports: [],
  templateUrl: './slidebar.component.html',
  styleUrl: './slidebar.component.css'
})
export class SlidebarComponent {
  @Input() expanded: boolean = false;
  @Output() toggleExpanded = new EventEmitter<boolean>();

  toggle() {
    this.expanded = !this.expanded;
    this.toggleExpanded.emit(this.expanded);
  }
}
