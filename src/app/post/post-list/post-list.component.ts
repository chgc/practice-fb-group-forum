import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router';

import { FbService, FacebookApiMethod } from '../shared/index';


@Component({
  moduleId: module.id,
  selector: 'fbf-post-list',
  templateUrl: 'post-list.component.html',
  styleUrls: ['post-list.component.css']
})
export class PostListComponent implements OnInit, OnDestroy {

  data: any = {
    posts: [],
    paging: { next: '', previous: '' }
  }
  dataSub: any;
  pages = [];
  pageIndex: number;

  constructor(private fb: FbService, private route: ActivatedRoute, private router: Router) {
    this.pageIndex = 0;
    this.pages = [];
  }


  ngOnInit() {
    this.fb.login().then(res => {
      this.getFeed({
        'token': res.authResponse.accessToken
      });
    }, err => {
      console.error(err);
    })
  }

  ngOnDestroy() {
    this.dataSub.unsubscribe();
  }

  getFeed(params) {
    this.dataSub = this.fb.getGroupFeed(params).subscribe(res => {
      if (this.pageIndex == this.pages.length) {
        this.data.posts = this.data.posts.concat(res.posts);
        this.pages.push(this.data.paging);
      }
    }, err => {
      console.log(err);
    })
  }


  next() {
    let url: string = "";
    let params = {};
    url = this.pages[this.pageIndex].next;
    this.pageIndex++;

    url.substring(url.indexOf('?') + 1)
      .split('&')
      .forEach(element => {
        var item = element.split("=");
        params[item[0]] = decodeURIComponent(item[1]);
      });
    this.getFeed(params);
  }

  onSelect(post) {
    this.router.navigate(['/posts', post.id]);
  }
}
