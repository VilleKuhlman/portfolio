import { Observable } from 'rxjs';
import * as shared from '../shared/shared.actions';
import { Portfolio } from '../portfolio/portfolio.model';

export interface State {
  portfolio: Observable<Portfolio>;
  loaded: boolean;
};

export const initialState: State = {
  portfolio: undefined,
  loaded: false
};


export function reducer(state = initialState, action: shared.Actions): State {
  switch (action.type) {
    case shared.LOAD_PORTFOLIO_SUCCESS: {
      return {
          portfolio: action.payload,
          loaded: true
      };
    }
    default: {
      return state;
    }
  }
}

export const getPortfolio = (state) => state.portfolio;
export const getPortfolioLoaded = (state) => state.loaded;