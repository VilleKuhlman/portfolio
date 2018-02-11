import { Actions, Effect } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import * as Shared from './shared.actions';
import { PortfolioService } from '../portfolio/portfolio.service';
import { of } from 'rxjs/observable/of';
import { exhaustMap, map, catchError } from 'rxjs/operators';

@Injectable()
export class PortfolioEffects {

  constructor(
    private actions$: Actions,
    private portfolioService: PortfolioService,
  ) {}

  @Effect()
  getPortfolio$ = this.actions$
    .ofType(Shared.LOAD_PORTFOLIO).pipe(
    exhaustMap(() =>
      this.portfolioService.getItems().pipe(
        map(portfolioEntity => new Shared.PortfolioLoadSuccessAction(portfolioEntity)),
        catchError(error => of(new Shared.PortfolioLoadFailureAction(error)))
      )
    ));

}