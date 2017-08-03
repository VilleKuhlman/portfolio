import { Observable } from 'rxjs/Observable';
import { Actions, ActionTypes } from '../shared/shared.actions';
import { SkillsearchUI } from '../action/skillsearch.ui.model';
import { Item } from '../item/item.model';
import { Skill } from '../skill/skill.model';
import '@ngrx/core/add/operator/select';


export interface State {

  currentSkillsearchUI: SkillsearchUI

};

export const initialState: State = {

  currentSkillsearchUI: undefined

};


export function reducer(state = initialState, action: Actions): State {
  switch (action.type) {
    case ActionTypes.LOAD: {
      const firstItem = action.payload.items[0];
      
      const newState: State = {
        currentSkillsearchUI: {

          toggledskillsearch: false,
          filteredskills: [],
          toggledskills: [],
          searchboxvalue: ""

        }
      }
      return newState;
    }

      case ActionTypes.TOGGLESKILLSEARCH: {
        const currentSkillsearchUI = action.payload.currentSkillsearchUI;
        const newtogglevalue = action.payload.toggled;

        const toggled = newtogglevalue ? newtogglevalue : currentSkillsearchUI.searchboxvalue === '' ? newtogglevalue : currentSkillsearchUI.toggledskillsearch;

        const newState: State = {
          currentSkillsearchUI: {
 
            toggledskillsearch: toggled,
            filteredskills: currentSkillsearchUI.filteredskills,
            toggledskills: [],
            searchboxvalue: currentSkillsearchUI.searchboxvalue
          }
        }
        return newState;
    }


      case ActionTypes.FILTERSKILL: {

        const currentSkillsearchUI = action.payload.currentSkillsearchUI;
        const inputValue = action.payload.inputValue;
        const skills = action.payload.skills;

        const filteredSkills = skills.filter(function(skill){

          return inputValue !== '' && skill.title.toLowerCase().indexOf(inputValue.toLowerCase()) !== -1;

        }).map(function(skill) {

          return skill.id;
        });


        const newState: State = {
          currentSkillsearchUI: {
            toggledskillsearch: true,
            filteredskills: filteredSkills,
            toggledskills: [],
            searchboxvalue: inputValue
          },
        }
        return newState;
    }


     case ActionTypes.TOGGLESKILL: {
        const currentUIState = action.payload.currentUIState;
        const skill = action.payload.skill;
        const toggled = action.payload.toggled;

        const idArray = [skill.id];

        const extendedtoggledskills = currentUIState.toggledskills.concat(idArray);

        const reducedtoggledskills = currentUIState.toggledskills.filter(function(id){

          return id !== skill.id;

        });

        const toggledskills = toggled ? extendedtoggledskills : reducedtoggledskills;


        const newState: State = {
          currentSkillsearchUI: {
            toggledskillsearch: true,
            filteredskills: currentUIState.filteredskills,
            toggledskills: toggledskills,
            searchboxvalue: currentUIState.searchboxvalue
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
  return state$.select(s => s.currentSkillsearchUI);
}
