import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { Portfolio } from './portfolio/portfolio.model';
import * as fromRoot from './shared/main.reducer';

import 'rxjs/add/operator/take';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/let';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  
 portfolio$: Observable<Portfolio>;

    constructor(store: Store<fromRoot.State>) {

        this.portfolio$ = store.let(fromRoot.getPortfolio);
    }

}
