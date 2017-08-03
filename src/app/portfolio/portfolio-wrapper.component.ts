import { Component} from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Portfolio } from './portfolio.model';
import { NavigationUI } from '../action/navigation.ui.model';
import { SkillsearchUI } from '../action/skillsearch.ui.model';
import * as fromRoot from '../shared/main.reducer';

@Component({
  selector: 'portfolio-wrapper',
  template: `
      <portfolio
        [portfolio]="portfolio$ | async"
        [currentNavigationUI]="uiNavigation$ | async"
        [currentSkillsearchUI]="uiSkillsearch$ | async"
        >
      </portfolio>
  `
})

export class PortfolioWrapperComponent {

  public portfolio$ : Observable<Portfolio>;
  public uiNavigation$: Observable<NavigationUI>;
  public uiSkillsearch$: Observable<SkillsearchUI>;

  constructor(private store: Store<fromRoot.State>){
  
      this.portfolio$ = this.store.let(fromRoot.getPortfolio);
      this.uiNavigation$ = this.store.let(fromRoot.getCurrentNavigationUI);
      this.uiSkillsearch$ = this.store.let(fromRoot.getCurrentSkillsearchUI);
  }

}