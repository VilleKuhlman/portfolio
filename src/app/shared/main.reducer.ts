import '@ngrx/core/add/operator/select';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/let';
import { Observable } from 'rxjs/Observable';
import { combineLatest } from 'rxjs/observable/combineLatest';
import { ActionReducer } from '@ngrx/store';

/**
 * The compose function is one of our most handy tools. In basic terms, you give
 * it any number of functions and it returns a function. This new function
 * takes a value and chains it through every composed function, returning
 * the output.
 *
 * More: https://drboolean.gitbooks.io/mostly-adequate-guide/content/ch5.html
 */
import { compose } from '@ngrx/core/compose';

/**
 * combineReducers is another useful metareducer that takes a map of reducer
 * functions and creates a new reducer that stores the gathers the values
 * of each reducer and stores them using the reducer's key. Think of it
 * almost like a database, where every reducer is a table in the db.
 *
 * More: https://egghead.io/lessons/javascript-redux-implementing-combinereducers-from-scratch
 */
import { combineReducers } from '@ngrx/store';

import * as fromPortfolio from './portfolio.reducer';
import * as fromNavigationUI from './navigation.ui.reducer';
import * as fromSkillsearchUI from './skillsearch.ui.reducer';


export interface State {
  portfolio: fromPortfolio.State,
  uiNavigation: fromNavigationUI.State,
  uiSkillsearch: fromSkillsearchUI.State
};

const reducers = {
  portfolio: fromPortfolio.reducer,
  uiNavigation: fromNavigationUI.reducer,
  uiSkillsearch: fromSkillsearchUI.reducer
};

export function reducer(state: any, action: any){

  const reducer: ActionReducer<State> = combineReducers(reducers);
  return reducer(state, action);
};

//Portfolio
export const getPortfolioState = (state$: Observable<State>) => state$.select(s => s.portfolio);
export const getPortfolio = compose(fromPortfolio.getPortfolio, getPortfolioState);


//Navigation UI
export const getNavigationUIState = (state$: Observable<State>) => state$.select(s => s.uiNavigation);
export const getCurrentNavigationUI = compose(fromNavigationUI.getCurrentGroup, getNavigationUIState);

//Skillsearch UI
export const getSkillsearchUIState = (state$: Observable<State>) => state$.select(s => s.uiSkillsearch);
export const getCurrentSkillsearchUI = compose(fromSkillsearchUI.getCurrentGroup, getSkillsearchUIState);
