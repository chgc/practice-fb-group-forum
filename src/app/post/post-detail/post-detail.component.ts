import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { FbService, Post, CLEAR } from '../shared/index';
import { NewlinePipe, YoutubePipe } from '../../shared/index';

@Component({
  moduleId: module.id,
  selector: 'fbf-post-detail',
  templateUrl: 'post-detail.component.html',
  styleUrls: ['post-detail.component.css'],
  pipes: [NewlinePipe, YoutubePipe]
})
export class PostDetailComponent implements OnInit, OnDestroy {

  routeSub: any;
  fbSub: any;
  post: any;
  posts: Observable<any>;

  constructor(private fb: FbService, private route: ActivatedRoute, private router: Router, public store: Store<any>) {
    this.posts = this.store.select('posts');

  }

  ngOnInit() {
    this.store.dispatch({ type: CLEAR });
    this.route.params.subscribe(params => {
      this.fb.getPost(params['id']);
    }, err => { })

    this.posts.subscribe((data: Post) => {
      if (data) {
        this.post = data.current;
      }
    });
  }

  ngOnDestroy() {
  }
}
