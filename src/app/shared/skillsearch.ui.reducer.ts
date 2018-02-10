import { Observable } from 'rxjs';
import * as shared from '../shared/shared.actions';
import { SkillsearchUI } from '../action/skillsearch.ui.model';
import { Item } from '../item/item.model';
import { Skill } from '../skill/skill.model';

export interface State {
  uiSkillsearch: SkillsearchUI
};

export const initialState: State = {
  uiSkillsearch: undefined
};


export function reducer(state = initialState, action: shared.Actions): State {
  switch (action.type) {
    case shared.LOAD_PORTFOLIO_SUCCESS: {
           
      const newState: State = {
        uiSkillsearch: {

          toggledskillsearch: false,
          filteredskills: [],
          toggledskills: [],
          searchboxvalue: ""

        }
      }
      return newState;
    }

      case shared.TOGGLESKILLSEARCH: {
        const currentSkillsearchUI = action.payload.currentSkillsearchUI;
        const newtogglevalue = action.payload.toggled;

        const toggled = newtogglevalue ? newtogglevalue : currentSkillsearchUI.searchboxvalue === '' ? newtogglevalue : currentSkillsearchUI.toggledskillsearch;

        const newState: State = {
          uiSkillsearch: { ...state.uiSkillsearch, ... {
            toggledskillsearch: toggled,    
            toggledskills: [],
          }}
        }
        return newState;
    }


      case shared.FILTERSKILL: {

        const currentSkillsearchUI = action.payload.currentSkillsearchUI;
        const inputValue = action.payload.inputValue;
        const skills = action.payload.skills;

        const filteredSkills = skills.filter(function(skill){

          return inputValue !== '' && skill.title.toLowerCase().indexOf(inputValue.toLowerCase()) !== -1;

        }).map(function(skill) {

          return skill.id;
        });


        const newState: State = {
          uiSkillsearch: {
            toggledskillsearch: true,
            filteredskills: filteredSkills,
            toggledskills: [],
            searchboxvalue: inputValue
          },
        }
        return newState;
    }


     case shared.TOGGLESKILL: {
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
          uiSkillsearch: { ...state.uiSkillsearch, ... {
            toggledskillsearch: true,
            toggledskills: toggledskills
          }}
        }
        return newState;
    }

    default: {
      return state;
    }
  }
}

export const getCurrentGroup = state => state.uiSkillsearch;


