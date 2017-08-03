import { Observable } from 'rxjs/Observable';
import { Actions, ActionTypes } from '../shared/shared.actions';
import { NavigationUI } from '../action/navigation.ui.model';
import { Item } from '../item/item.model';
import '@ngrx/core/add/operator/select';


export interface State {

  currentUINavigation: NavigationUI

};

export const initialState: State = {

  currentUINavigation: undefined

};


export function reducer(state = initialState, action: Actions): State {
  switch (action.type) {
    case ActionTypes.LOAD: {
      const firstItem = action.payload.items[0];
      
      const newState: State = {
        currentUINavigation: {

          order: firstItem.order

        }
      }
      return newState;
    }

    case ActionTypes.NAVIGATE: {

      const direction = action.payload.direction;
      const items = action.payload.items;
      const currentUIState = action.payload.currentUIGroup;

      //Find current group and -element from portfolio using values from currentUIGroup
      const currentItem: Item = items.filter(i => i.order === currentUIState.order)[0];
 
      //Find indexes for current item
      const currentItemIndex: number = items.indexOf(currentItem);

      //If we swich group, add the direction (-1 OR 1) to index
      const newItemIndex: number = currentItemIndex + direction;
  

      const newState: State = {
        currentUINavigation: {
          order: items[newItemIndex].order
        }
      }
      return newState;
    }

    default: {
      return state;
    }
  }
}

export function getCurrentGroup(state$: Observable<State>){
  return state$.select(s => s.currentUINavigation);
}
