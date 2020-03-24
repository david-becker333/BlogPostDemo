import { Component, OnInit, Input, Output, EventEmitter, OnChanges, ChangeDetectorRef } from '@angular/core';

import { DEFAULT_ITEMS_PER_PAGE } from '../../../app.constants';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html'
})
export class PaginationComponent implements OnInit, OnChanges {

  @Input()
  collectionSize: number = 0;

  @Input()
  pageSize: number = DEFAULT_ITEMS_PER_PAGE;

  @Output()
  onPageChange: EventEmitter<number> = new EventEmitter<number>();

  totalPages: number;

  currentPage: number = 1;

  constructor() {
  }

  ngOnInit() {
    this.initPages();
  }

  initPages() {
    this.totalPages = Math.ceil(this.collectionSize / this.pageSize);
  }

  goToPage(page: number) {

    if (page < 1) {
      this.currentPage = 1;
    } else if (page > this.totalPages) {
      this.currentPage = this.totalPages;
    } else {
      this.currentPage = page;
    }
    this.onPageChange.emit(this.currentPage);
  }

  ngOnChanges(values) {
    this.initPages();
  }

}
