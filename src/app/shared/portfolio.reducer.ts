/**
 * The compose function is one of our most handy tools. In basic terms, you give
 * it any number of functions and it returns a function. This new function
 * takes a value and chains it through every composed function, returning
 * the output.
 *
 * More: https://drboolean.gitbooks.io/mostly-adequate-guide/content/ch5.html
 */
import { compose } from '@ngrx/core/compose';
import { Observable } from 'rxjs/Observable';
import { Actions, ActionTypes } from '../shared/shared.actions';
import { Portfolio } from '../portfolio/portfolio.model';
import '@ngrx/core/add/operator/select';


export interface State {
  portfolio: Portfolio;
};

export const initialState: State = {
  portfolio: undefined
};


export function reducer(state = initialState, action: Actions): State {
  switch (action.type) {
    case ActionTypes.LOAD: {
      return {
          portfolio: action.payload
      };
    }
    default: {
      return state;
    }
  }
}

export function getPortfolio(state$: Observable<State>) {

  return state$.select(s => s.portfolio);
}
