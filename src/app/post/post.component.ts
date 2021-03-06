import { Component, OnInit } from '@angular/core';
import { FbService } from './shared/index';
@Component({
  moduleId: module.id,
  selector: 'fbf-post',
  template: `<router-outlet></router-outlet>`,
  styleUrls: ['post.component.css']
})
export class PostComponent implements OnInit {

  constructor(private fb: FbService) {
  }

  ngOnInit() {
    this.fb.login();
  }

}
