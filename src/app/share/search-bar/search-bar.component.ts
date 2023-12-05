import { Component, EventEmitter, Output } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [FontAwesomeModule],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.scss',
})
export class SearchBarComponent {
  @Output() searchText = new EventEmitter<string>();
  faIcon = faMagnifyingGlass;

  onSearch(text: string) {
    this.searchText.emit(text);
  }

  onKeyUp(event: any) {
    if (event.keyCode === 13) {
      this.onSearch(event.target.value);
    }
  }
}
