import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { FbService, Post, LOAD } from '../shared/index';
import { NewlinePipe, MorePipe } from '../../shared/index';



@Component({
  moduleId: module.id,
  selector: 'fbf-post-list',
  templateUrl: 'post-list.component.html',
  styleUrls: ['post-list.component.css'],
  pipes: [NewlinePipe, MorePipe]
})
export class PostListComponent implements OnInit {
  data: any = {
    posts: [],
    paging: { next: '', previous: '' }
  }
  isloadingMore: boolean;

  constructor(private fb: FbService, private route: ActivatedRoute, private router: Router,
    public store: Store<any>) {
  }


  ngOnInit() {
    this.store.select('posts').subscribe(data => {
      this.data = data;
      this.isloadingMore = false;
    });
  }

  loadmore() {
    let url: string = "";
    let params = {};
    url = this.data.paging.next;

    url.substring(url.indexOf('?') + 1)
      .split('&')
      .forEach(element => {
        var item = element.split("=");
        params[item[0]] = decodeURIComponent(item[1]);
      });
    this.isloadingMore = true;
    this.fb.getGroupFeed(params);
  }

  onSelect(post) {
    this.router.navigate(['/posts', post.id]);
  }

  addToBlackList(post) {
    this.fb.addToBlackList(post);
  }

  onScroll(event) {
    var windowHeight = "innerHeight" in window ? window.innerHeight : document.documentElement.offsetHeight;
    var body = document.body, html = document.documentElement;
    var docHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);
    let windowBottom = windowHeight + window.pageYOffset;
    if (windowBottom >= docHeight - 50 && this.isloadingMore == false) {
      this.loadmore();
    }
  }
}
