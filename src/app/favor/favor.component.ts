import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import { NewlinePipe } from '../shared/index';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { AngularFire } from 'angularfire2';

@Component({
  moduleId: module.id,
  selector: 'fbf-favor',
  templateUrl: 'favor.component.html',
  styleUrls: ['favor.component.css'],
  pipes: [NewlinePipe]
})
export class FavorComponent implements OnInit {

  favorsub: Observable<any>;
  favorList = [];
  constructor(private store: Store<any>, private af: AngularFire, private router: Router) {
    this.favorsub = this.store.select('favors');
  }

  ngOnInit() {
    this.favorsub.subscribe(data => {
      this.favorList = data;
    })
  }
  removeFavor(favor) {
    this.af.database.list('favor').remove(favor.$key);
  }

  onSelect(post) {
    this.router.navigate(['/posts', post.id]);
  }
}
