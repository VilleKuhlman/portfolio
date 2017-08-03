import { Component, Input } from '@angular/core';
import { SkillsearchUI } from '../action/skillsearch.ui.model';
import { ToggleSkillSearchAction} from '../shared/shared.actions';
import { FilterSkillAction} from '../shared/shared.actions';
import { Skill } from '../skill/skill.model';

import * as fromRoot from '../shared/main.reducer';
import { Store } from '@ngrx/store';

@Component({
    selector: 'skillsearch',
    template: `
    <div class="skillsearch col-xs-11 col-sm-8" [ngClass]="{'titleClass':currentSkillsearchUI.toggledskillsearch}">
    <input type="text" #searchBox class="input" (focusin)="toggleskillsearch(true)" (focusout)="toggleskillsearch(false)" placeholder="Search for skills" (keyup)="search(searchBox.value)" />
    <span class="glyphicon glyphicon-search" [hidden]="currentSkillsearchUI.toggledskillsearch"></span>
    </div>

    <div *ngIf="currentSkillsearchUI.toggledskillsearch" class="skill-list col-xs-12 col-sm-10 col-sm-offset-1">
    <ng-container *ngFor="let skill of (skills | skillFilter:currentSkillsearchUI)">
    <skill [currentSkillsearchUI]="currentSkillsearchUI" 
    [skill]="skill" 
    class="list-group-item" 
    [ngClass]="{'toggled-skill':currentSkillsearchUI.toggledskills.includes(skill.id)}"
    ></skill>
    </ng-container>
    </div>   
    `,
   styleUrls: ['./skillsearch.component.css']


})

export class SkillsearchComponent {

    @Input() currentSkillsearchUI: SkillsearchUI;
    
    @Input() skills: Skill[];
   
    constructor(private store: Store<fromRoot.State>){};

    toggleskillsearch(togglevalue) {
        
        const toggled: boolean = togglevalue;

            const currentSkillsearchUI: SkillsearchUI = this.currentSkillsearchUI;
            this.store.dispatch(new ToggleSkillSearchAction({currentSkillsearchUI, toggled}));

    }


    search(inputValue: string){

        const currentSkillsearchUI: SkillsearchUI = this.currentSkillsearchUI;
        const skills = this.skills;

        this.store.dispatch(new FilterSkillAction({currentSkillsearchUI, inputValue, skills})); 
    
    }

}  
   
   
