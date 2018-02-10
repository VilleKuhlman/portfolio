import { Actions, Effect } from '@ngrx/effects';
import { Injectable } from '@angular/core';

import * as Shared from './shared.actions';
import { PortfolioService } from '../portfolio/portfolio.service';

import 'rxjs/add/operator/exhaustMap';
import { of } from 'rxjs/observable/of';

@Injectable()
export class PortfolioEffects {

  constructor(
    private actions$: Actions,
    private portfolioService: PortfolioService,
  ) {}

  @Effect()
  getPortfolio$ = this.actions$
    .ofType(Shared.LOAD_PORTFOLIO)
    .exhaustMap(() =>
      this.portfolioService.getItems()
        .map(portfolioEntity => new Shared.PortfolioLoadSuccessAction(portfolioEntity))   
        .catch(error => of(new Shared.PortfolioLoadFailureAction(error)))
    );

}