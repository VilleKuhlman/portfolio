import { Component} from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
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
      this.portfolio$ = store.pipe(select(fromRoot.getPortfolio));
      this.uiNavigation$ = store.pipe(select(fromRoot.getCurrentNavigationUI));
      this.uiSkillsearch$ = store.pipe(select(fromRoot.getCurrentSkillsearchUI));

      store.select(fromRoot.getCurrentNavigationUI).subscribe(x => console.log(x));
  }


}
