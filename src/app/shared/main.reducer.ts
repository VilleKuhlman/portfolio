import { Observable } from 'rxjs';
import { createSelector, ActionReducerMap } from '@ngrx/store';

import * as fromPortfolio from './portfolio.reducer';
import * as fromNavigationUI from './navigation.ui.reducer';
import * as fromSkillsearchUI from './skillsearch.ui.reducer';

export interface State {
  portfolio: fromPortfolio.State,
  uiNavigation: fromNavigationUI.State,
  uiSkillsearch: fromSkillsearchUI.State
};

export const reducers: ActionReducerMap<State> = {
  portfolio: fromPortfolio.reducer,
  uiNavigation: fromNavigationUI.reducer,
  uiSkillsearch: fromSkillsearchUI.reducer
};

//Portfolio
export const getPortfolioState = state$ => state$.portfolio;
export const getPortfolio = createSelector(getPortfolioState, fromPortfolio.getPortfolio);
export const getPortfolioLoaded = createSelector(getPortfolioState, fromPortfolio.getPortfolioLoaded);

//Navigation UI
export const getNavigationUIState = state$ => state$.uiNavigation;
export const getCurrentNavigationUI = createSelector(getNavigationUIState, fromNavigationUI.getCurrentGroup);

//Skillsearch UI
export const getSkillsearchUIState = state$ => state$.uiSkillsearch;
export const getCurrentSkillsearchUI = createSelector(getSkillsearchUIState, fromSkillsearchUI.getCurrentGroup);
