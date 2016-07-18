import { Injectable } from '@angular/core';
import {Router, CanActivate} from '@angular/router';

import { FbService } from './index'

@Injectable()
export class CheckLogin implements CanActivate {
  constructor(private router: Router, private fb: FbService) { }

  canActivate() {
    if (this.fb.userObj !== undefined) {
      return true;
    }
    this.router.navigate(['/posts']);
    return false;
  }
}
