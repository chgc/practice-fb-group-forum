import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { AngularFire } from 'angularfire2';

@Component({
  moduleId: module.id,
  selector: 'fbf-favor',
  templateUrl: 'favor.component.html',
  styleUrls: ['favor.component.css']
})
export class FavorComponent implements OnInit {

  favorsub: Observable<any>;
  favorList = [];
  constructor(private store: Store<any>, private af: AngularFire) {
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
}
