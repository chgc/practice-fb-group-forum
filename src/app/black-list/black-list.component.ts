import { Component, OnInit } from '@angular/core';
import { BlacklistService } from './shared/index';
import { FirebaseListObservable } from 'angularfire2';

@Component({
  moduleId: module.id,
  selector: 'fbf-black-list',
  templateUrl: 'black-list.component.html',
  styleUrls: ['black-list.component.css'],
  providers: [ BlacklistService ]
})
export class BlackListComponent implements OnInit {

  users: FirebaseListObservable<any>;

  constructor(public _blacklistService: BlacklistService) {}

  ngOnInit() {
    this.users = this._blacklistService.blackList;
  }

  unblock(user){
    this._blacklistService.unblock(user);
  }

}
