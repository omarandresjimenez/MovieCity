import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [FontAwesomeModule, CommonModule, FormsModule],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.scss',
})
export class SearchBarComponent {
  @Output() searchText = new EventEmitter<string>();
  faIcon = faMagnifyingGlass;
  showAll = false;
  txtSearch = '';

  onSearch() {
    this.searchText.emit(this.txtSearch);
    this.showAll = this.txtSearch.length !== 0;
  }

  showAllData() {
    this.showAll = false;
    this.txtSearch = '';
    this.onSearch();
  }

  onKeyUp(event: any) {
    if (event.keyCode === 13) {
      this.onSearch();
    }
  }
}
