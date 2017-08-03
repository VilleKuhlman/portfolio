import { Component, Input} from '@angular/core';

import { Portfolio } from './portfolio.model';
import { Item } from '../item/item.model';
import { SkillsearchUI } from '../action/skillsearch.ui.model';
import { NavigationUI } from '../action/navigation.ui.model';

import { NavigateAction} from '../shared/shared.actions';

import * as fromRoot from '../shared/main.reducer';
import { Store } from '@ngrx/store';


@Component({
  selector: 'portfolio',
  template: `
      <items [ngStyle]="setStyles()"
      [items]="portfolio.items"
      [currentNavigationUI]="currentNavigationUI"
      [currentSkillsearchUI]="currentSkillsearchUI"
      (navigate)="navigate($event)"
      ></items>

      <navigator
        [currentNavigationUI]="currentNavigationUI"
        [items]="portfolio.items"
        (navigate)="navigate($event)"
      ></navigator>
      
  `,
   styleUrls: ['./portfolio.component.css']
})


export class PortfolioComponent{

  @Input() portfolio: Portfolio;
  @Input() currentNavigationUI: NavigationUI;
  @Input() currentSkillsearchUI: SkillsearchUI;

  constructor(private store: Store<fromRoot.State>){};

    navigate($event:number){

    const direction: number = $event;
    const items: Item[] = this.portfolio.items;
    const currentUIGroup: NavigationUI = this.currentNavigationUI;

    this.store.dispatch(new NavigateAction({direction, items, currentUIGroup}));
    
  }

    setStyles() {   

        let styles = {  
            'top':((this.currentNavigationUI.order - 1) *-100).toString()+"%"        
        };
        return styles;
    }

}