import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { map, take, filter } from 'rxjs/operators';

import { Observable } from 'rxjs';
import { PortfolioService } from './portfolio/portfolio.service';
import * as fromRoot from './shared/main.reducer';
import * as actions from './shared/shared.actions';


/**
 * Guards are hooks into the route resolution process, providing an opportunity
 * to inform the router's navigation process whether the route should continue
 * to activate this route. Guards must return an observable of true or false.
 */

@Injectable()
export class AppGuard implements CanActivate {
  constructor(
    private store: Store<fromRoot.State>,
    private portfolioService: PortfolioService,
    private router: Router
  ) { }

  /**
   * This method loads a portfolio from the API, returning
   * `true` or `false` if it was found.
   */

  getPortfolioFromAPI(): Observable<boolean> {
            
        return this.store.pipe(
          select(fromRoot.getPortfolioLoaded),
          map(portfolio => {
            if (!portfolio) {
              this.store.dispatch(new actions.LoadAction());
              return false;
            }
            return true;
          }),
          filter(loaded => loaded),
          take(1)
        );
  }
  
  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    
    return this.getPortfolioFromAPI();
  }
}