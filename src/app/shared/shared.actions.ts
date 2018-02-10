import { Action } from '@ngrx/store';
import { Portfolio } from '../portfolio/portfolio.model';
import { Item } from '../item/item.model';

/**
 * For each action type in an action group, make a simple
 * enum object for all of this group's action types.
 *
 * The 'type' utility function coerces strings into string
 * literal types and runs a simple check to guarantee all
 * action types in the application are unique.
 */
 
export const LOAD_PORTFOLIO = 'Load';
export const LOAD_PORTFOLIO_SUCCESS = '[Portfolio] Courses Get Success';
export const LOAD_PORTFOLIO_FAILURE = '[Portfolio] Courses Get Failure';
export const NAVIGATE = '[Object] Navigate';
export const TOGGLESKILLSEARCH = '[Object] toggleskillsearch';
export const FILTERSKILL = '[Object] filterskill';
export const TOGGLESKILL = '[Object] toggleskill';

/**
 * Every action is comprised of at least a type and an optional
 * payload. Expressing actions as classes enables powerful
 * type checking in reducer functions.
 */
export class LoadAction implements Action {
  readonly type = LOAD_PORTFOLIO;
}

export class PortfolioLoadSuccessAction implements Action {
  readonly type = LOAD_PORTFOLIO_SUCCESS;

  constructor(public payload: any) { }
}

export class PortfolioLoadFailureAction implements Action {
  readonly type = LOAD_PORTFOLIO_FAILURE;

  constructor(public payload: any) { }
}

export class NavigateAction implements Action {
  readonly type = NAVIGATE;

  constructor(public payload: any) {}
}

export class ToggleSkillSearchAction implements Action {
  readonly type = TOGGLESKILLSEARCH;

  constructor(public payload: any) {}
}

export class FilterSkillAction implements Action {
  readonly type = FILTERSKILL;

  constructor(public payload: any) {}
}

export class ToggleSkillAction implements Action {
  readonly type = TOGGLESKILL;

  constructor(public payload: any) {}
}

/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
  */
export type Actions = LoadAction | PortfolioLoadSuccessAction | PortfolioLoadFailureAction | NavigateAction | ToggleSkillSearchAction | FilterSkillAction | ToggleSkillAction;
 
