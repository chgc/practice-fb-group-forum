import { Component, OnInit } from '@angular/core';
import { BlacklistService } from './shared/index';
import { FirebaseListObservable } from 'angularfire2';

import { FbService } from '../post/shared/index';

@Component({
  moduleId: module.id,
  selector: 'fbf-black-list',
  templateUrl: 'black-list.component.html',
  styleUrls: ['black-list.component.css'],
  providers: [BlacklistService]
})
export class BlackListComponent implements OnInit {

  users: FirebaseListObservable<any>;

  constructor(public _blacklistService: BlacklistService, private fbService: FbService) {

  }

  ngOnInit() {
    this._blacklistService.blackList.subscribe(users => {
      this.users = users.filter((user: any) => {
        return user.uid == this.fbService.authUser.uid;
      });
    })
  }

  unblock(user) {
    this._blacklistService.unblock(user);
  }

}
