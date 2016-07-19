import { Component, OnInit, OnDestroy } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router} from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { FbService, Post, POST_CLEAR } from '../shared/index';
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
  postssub: Observable<any>;
  favorsub: Observable<any>;
  favorList = [];

  constructor(private fb: FbService, private route: ActivatedRoute, private router: Router, public store: Store<any>, private location: Location) {
    this.postssub = this.store.select('posts');
    this.favorsub = this.store.select('favors');
  }

  ngOnInit() {
    this.store.dispatch({ type: POST_CLEAR });
    this.route.params.subscribe(params => {
      this.fb.getPost(params['id']);
    }, err => { })

    this.postssub.subscribe((data: Post) => {
      if (data) {
        this.post = data.current;
      }
    });

    this.favorsub.subscribe(data => {
      this.favorList = data;
    })

  }

  ngOnDestroy() {
  }

  addToFavor(post) {
    let obj = {
      id: post.id,
      message: post.message,
      'from': post.from
    };
    this.fb.addToMyFavor(obj);
  }

  removeFavor(post) {
    this.fb.removeFaovr(post);
  }

  back(){
    this.location.back();
  }
}
