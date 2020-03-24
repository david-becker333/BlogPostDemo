import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { IState } from '../../store/state';
import { IBlogPost } from '../../shared/model/blog.model';
import { selectPostsByQuery } from '../../store/state/blog.state';
import { filter, take } from 'rxjs/operators';
import { DEFAULT_ITEMS_PER_PAGE } from '../../app.constants';
import { Router } from '@angular/router';
import { AccountService } from '../../core/auth/account.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit, OnDestroy {

  posts: IBlogPost[];
  error: any;
  success: any;
  totalItems: number = 0;
  itemsPerPage: number = DEFAULT_ITEMS_PER_PAGE;
  page: number = 1;

  bloggerId: number;

  constructor(
    private store: Store<IState>,
    private router: Router,
    private accountService: AccountService
  ) { 
      this.bloggerId = this.accountService.loggedUser.id;
  }

  isPostOwner(postOwnerId) {
    console.log('postId: ', postOwnerId, ', userId: ', this.bloggerId)
    return this.bloggerId === postOwnerId;
  }

  load() {
    const postQuery = {
      page: this.page,
      itemsPerPage: this.itemsPerPage
    }
    this.store.select(selectPostsByQuery(postQuery))
      .pipe(
        filter(resp => {
          const data = resp.data as IBlogPost[];
          return data.length !== 0
        }),
        take(1)
      ).subscribe(resp => {
        this.posts = resp.data;
        this.totalItems = resp.meta.totalRecords;
      }, err => {
        this.error = err;
      })
  }

  loadPage(page: number) {
      this.page = page;
      this.transition();
  }

  transition() {
    this.load();
  }

  

  clear() {
    this.page = 1;
    this.load();
  }

  ngOnInit() {
    this.load();
  }

  ngOnDestroy() {
  }
}
