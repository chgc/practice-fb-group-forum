import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { FbService, Post, LOAD } from '../shared/index';




@Component({
  moduleId: module.id,
  selector: 'fbf-post-list',
  templateUrl: 'post-list.component.html',
  styleUrls: ['post-list.component.css']
})
export class PostListComponent implements OnInit {

  posts: Observable<any>;
  data: any = {
    posts: [],
    paging: { next: '', previous: '' }
  }

  constructor(private fb: FbService, private route: ActivatedRoute, private router: Router,
    public store: Store<any>) {
  }


  ngOnInit() {
    this.posts = this.store.select('posts');
    this.posts.subscribe(data => {
      this.data = data;
    });
    // call service -> dispatch -> store
    this.fb.getGroupFeed();

  }

  next() {
    let url: string = "";
    let params = {};
    url = this.data.paging.next;

    url.substring(url.indexOf('?') + 1)
      .split('&')
      .forEach(element => {
        var item = element.split("=");
        params[item[0]] = decodeURIComponent(item[1]);
      });
    this.fb.getGroupFeed(params);
  }

  onSelect(post) {
    this.router.navigate(['/posts', post.id]);
  }
}
