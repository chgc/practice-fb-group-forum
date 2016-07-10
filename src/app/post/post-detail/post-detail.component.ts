import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router';
import { FbService } from '../shared/index';

@Component({
  moduleId: module.id,
  selector: 'fbf-post-detail',
  templateUrl: 'post-detail.component.html',
  styleUrls: ['post-detail.component.css']
})
export class PostDetailComponent implements OnInit, OnDestroy {

  routeSub: any;
  fbSub: any;
  post: any;

  constructor(private fb: FbService, private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit() {
    this.fb.login().then(res => {
      this.routeSub = this.route.params.subscribe(params => {
        this.fbSub = this.fb.getPost(params['id']).subscribe(data => {
          this.post = data;
          console.log(this.post);
        })
      })
    }, err => {
      console.error(err);
    })
  }

  ngOnDestroy() {
    this.routeSub.unsubscribe();
    this.fbSub.unsubscribe();
  }

}
