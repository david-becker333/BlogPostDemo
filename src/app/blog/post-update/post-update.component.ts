import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { Store } from '@ngrx/store';
import { IState } from '../../store/state';
import { ActivatedRoute, Router } from '@angular/router';
import { selectPost, isProcessing } from '../../store/state/blog.state';
import { Observable, Subject } from 'rxjs';
import { IPost, Post } from '../../shared/model/blog.model';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { IUser } from '../../shared/model/user.model';
import { selectUser } from '../../store/state/user.state';
import { AccountService } from '../../core/auth/account.service';
import { take, filter, debounceTime } from 'rxjs/operators';
import { updatePost, createPost, deletePost } from '../../store/actions/post.actions';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { DeactivationGuarded } from '../../shared/model/app.model';


@Component({
  selector: 'app-post-update',
  templateUrl: './post-update.component.html',
  styleUrls: ['./post-update.component.scss']
})
export class PostUpdateComponent implements OnInit, DeactivationGuarded {

  @ViewChild('confirmNavigation', null)
  confirmNavigation: ViewContainerRef;

  post: IPost;

  postForm: FormGroup;

  user: IUser;

  isSaving$: Observable<boolean> = this.store.select(isProcessing);

  isNew: boolean = false;

  showConfirmation: boolean = false;

  modalOptions: NgbModalOptions;

  messageStatus: boolean;

  messages = new Subject<string>();

  successMessage: string = '';

  constructor(
    private store: Store<IState>,
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private accountService: AccountService,
    private router: Router,
    private ngbModal: NgbModal
  ) {
    this.modalOptions = {
      backdrop: 'static'
    }
  }


  canDeactivate(): boolean | Observable<boolean> | Promise<boolean> {
    if (this.postForm.dirty) {
      return this.ngbModal.open(this.confirmNavigation, this.modalOptions).result
    } else {
      return true;
    }
  }


  ngOnInit() {

    this.generatePostFormGroup();

    const postId = this.activatedRoute.snapshot.paramMap.get('id');

    if (!postId) {
      this.isNew = true;
    }

    if (!this.isNew) {
      this.store.select(selectPost(postId)).pipe(
        filter(p => !!p),
        take(1)
      ).subscribe(post => {
        /* 
          Because ngrx uses ngrx-store-freeze to freeze store objects from any mutations.
          Can't use lodash _clone or _cloneDeep because requirements dont' allow lodash.
          Object.assign() would just copy over freeze properties. So for this demo we'll use json method
        */
        this.post = JSON.parse(JSON.stringify(post));
        this.updateForm(post);
      }, () => {
        this.post = new Post();
      });
    } else {
      this.post = new Post();
    }
    
    this.user = this.accountService.loggedUser;

    setTimeout(() => this.messageStatus = true, 20000);

    this.messages.subscribe(message => this.successMessage = message);
    this.messages.pipe(
      debounceTime(5000)
    ).subscribe(() => this.successMessage = '');
  }


  updateForm(post: IPost): void {
    this.postForm.patchValue({
      title: post.title,
      message: post.body
    })
  }

  generatePostFormGroup() {
    this.postForm = this.fb.group({
      title: new FormControl('', [Validators.required, Validators.maxLength(200)]),
      message: new FormControl('', [Validators.required, Validators.maxLength(2000)])
    })
  }

  save() {
    this.updatePost(this.post, this.user);
    if (!this.isNew) {
      this.store.dispatch(updatePost(this.post));
      this.showSuccessMessage('Successfully updated post.')
    } else {
      this.store.dispatch(createPost(this.post));
      this.showSuccessMessage('Successfully created post.')
    }
    // reset to pristine state.
    this.postForm.markAsPristine();
  }


  showSuccessMessage(msg) {
    this.messages.next(msg);
  }

  openDeleteConfirmation(content) {
    this.ngbModal.open(content, this.modalOptions).result.then(() => {
      this.store.dispatch(deletePost(this.post.id));
      this.postForm.markAsPristine();
      this.router.navigate(['/posts']);
    }, () => {
    });
  }

  openConfirmation(content) {
    this.ngbModal.open(content, this.modalOptions).result.then(() => {
      this.router.navigate(['/posts']);
    }, () => {
      // Dismiss actions here
    });
  }

  cancel() {
    this.router.navigateByUrl('/home');
  }

  updatePost(post: IPost, user?: IUser) {
    post.title = this.postForm.get(['title']).value;
    post.body = this.postForm.get(['message']).value;

    if (!post.id) {
      post.userId = user.id
    }
  }

}
