import { Injectable } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';


@Injectable()
export class BlacklistService {

  blackList: FirebaseListObservable<any>;

  constructor(public af: AngularFire) {
    this.blackList = af.database.list('blacklist');
  }

  unblock(user) {    
    this.blackList.remove(user.$key);

  }
}
