import { Injectable } from '@angular/core';
import { AngularFire, FirebaseListObservable, FirebaseAuthState } from 'angularfire2';

import { Store } from '@ngrx/store';
import 'rxjs/Rx';
import { Subject } from 'rxjs/Subject';

import { POST_RESET } from '../../post/shared/index';

@Injectable()
export class BlacklistService {

  blackList: FirebaseListObservable<any>;
  authUser: FirebaseAuthState;
  subject: Subject<any>;

  constructor(public af: AngularFire, public store: Store<any>) {
    this.blackList = af.database.list('/blacklist');
  }

  unblock(user) {
    this.blackList.remove(user);
    this.store.dispatch({ type: POST_RESET });
  }
}
