import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { StoreModule } from '@ngrx/store';
import { RouterStoreModule } from '@ngrx/router-store';

import { routing } from './app.routing';
import { AppGuard } from './app.guard';

import { NavigatorComponent } from './navigator/navigator.component';
import { ProgressbarComponent } from './progressbar/progressbar.component';
import { ItemComponent } from './item/item.component';
import { SkillsearchComponent } from './skillsearch/skillsearch.component';
import { SkillComponent } from './skill/skill.component';
import { SkillFilterPipe } from './shared/shared.utils';
import { currentDatePipe } from './shared/shared.utils';
import { CoverComponent } from './cover/cover.component';
import { ContactComponent } from './contact/contact.component';
import { IntroComponent } from './intro/intro.component';


import { PortfolioWrapperComponent } from './portfolio/portfolio-wrapper.component';
import { PortfolioComponent } from './portfolio/portfolio.component';
import { PortfolioService } from './portfolio/portfolio.service';

import { AppComponent } from './app.component';


import { reducer } from './shared/main.reducer';


@NgModule({
  declarations: [
    AppComponent,
    PortfolioWrapperComponent,
    PortfolioComponent,
    ItemComponent,
    NavigatorComponent,
    ProgressbarComponent,
    SkillsearchComponent,
    SkillComponent,
    SkillFilterPipe,
    currentDatePipe,
    CoverComponent,
    ContactComponent,
    IntroComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing,

    /**
     * StoreModule.provideStore is imported once in the root module, accepting a reducer
     * function or object map of reducer functions. If passed an object of
     * reducers, combineReducers will be run creating your application
     * meta-reducer. This returns all providers for an @ngrx/store
     * based application.
     */
    StoreModule.provideStore(reducer),

       /**
     * @ngrx/router-store keeps router state up-to-date in the store and uses
     * the store as the single source of truth for the router's state.
     */
    RouterStoreModule.connectRouter()

    
  ],
  providers: [PortfolioService, AppGuard],
  bootstrap: [AppComponent]
})

export class AppModule {}
