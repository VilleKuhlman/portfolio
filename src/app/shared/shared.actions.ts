import { Action } from '@ngrx/store';
import { Portfolio } from '../portfolio/portfolio.model';
//import { UIState } from '../action/ui-state.model';
import { type } from './shared.utils';
import { Item } from '../item/item.model';

/**
 * For each action type in an action group, make a simple
 * enum object for all of this group's action types.
 *
 * The 'type' utility function coerces strings into string
 * literal types and runs a simple check to guarantee all
 * action types in the application are unique.
 */
export const ActionTypes = {
    LOAD: type('[Portfolio] Load'),
    NAVIGATE: type('[Object] Navigate'),
    TOGGLESKILLSEARCH: type('[Object] toggleskillsearch'),
    FILTERSKILL: type('[Object] filterskill'),
    TOGGLESKILL: type('[Object] toggleskill')
};

/**
 * Every action is comprised of at least a type and an optional
 * payload. Expressing actions as classes enables powerful
 * type checking in reducer functions.
 *
 * See Discriminated Unions: https://www.typescriptlang.org/docs/handbook/advanced-types.html#discriminated-unions
 */
export class LoadAction implements Action {
  readonly type = ActionTypes.LOAD;

  constructor(public payload: Portfolio) { }
}

export class NavigateAction implements Action {
  readonly type = ActionTypes.NAVIGATE;

  constructor(public payload: any) {}
}

export class ToggleSkillSearchAction implements Action {
  readonly type = ActionTypes.TOGGLESKILLSEARCH;

  constructor(public payload: any) {}
}

export class FilterSkillAction implements Action {
  readonly type = ActionTypes.FILTERSKILL;

  constructor(public payload: any) {}
}

export class ToggleSkillAction implements Action {
  readonly type = ActionTypes.TOGGLESKILL;

  constructor(public payload: any) {}
}

/**
 * Exxport a type alias of all actions in this action group
 * so that reducers can easily compose action types
  */
export type Actions = LoadAction | NavigateAction | ToggleSkillSearchAction | FilterSkillAction | ToggleSkillAction;
 
