import { Observable } from 'rxjs';
import { NavigationUI } from '../action/navigation.ui.model';
import { Item } from '../item/item.model';
import * as shared from '../shared/shared.actions';

export interface State {

  uiNavigation: NavigationUI

};

export const initialState: State = {

  uiNavigation: undefined

};


export function reducer(state = initialState, action: shared.Actions): State {
  switch (action.type) {
    case shared.LOAD_PORTFOLIO_SUCCESS: {
      const firstItem = action.payload.items[0];
      
      const newState: State = {
        uiNavigation: {

          order: firstItem.order

        }
      }
      return newState;
    }

    case shared.NAVIGATE: {

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
        uiNavigation: {
          order: items[newItemIndex].order
        }
      }

      //console.log(newState);

      return newState;
    }

    default: {
      return state;
    }
  }
}

export const getCurrentGroup = (state:State) => state.uiNavigation;

