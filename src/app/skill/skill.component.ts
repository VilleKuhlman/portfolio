import {Component, Input} from '@angular/core';
import { SkillsearchUI } from '../action/skillsearch.ui.model';
import { Skill } from '../skill/skill.model';
import { ToggleSkillAction } from '../shared/shared.actions';

import * as fromRoot from '../shared/main.reducer';
import { Store } from '@ngrx/store';

@Component({
    selector: 'skill',
    template: `
    <div>{{skill.title}}</div>
    <span class="glyphicon glyphicon-plus pull-right" (click)="toggleskill(true)" [hidden]="currentSkillsearchUI.toggledskills.includes(skill.id)"></span>
    <span class="glyphicon glyphicon-minus pull-right" (click)="toggleskill(false)" [hidden]="!currentSkillsearchUI.toggledskills.includes(skill.id)"></span>
    <br><br>
    <div class="description" [hidden]="!currentSkillsearchUI.toggledskills.includes(skill.id)">
    Last Used: {{skill.used | currentDate}}
    <br>
    Experience: {{skill.experience}} years
    </div>
    `,
    styleUrls: ['./skill.component.css']

})

export class SkillComponent {

    @Input() skill: Skill;
    @Input() toggled: boolean;
    @Input() currentSkillsearchUI: SkillsearchUI;

    constructor(private store: Store<fromRoot.State>){};
    
    toggleskill(toggled: boolean){

        const currentUIState: SkillsearchUI = this.currentSkillsearchUI;

        const skill = this.skill;

        this.store.dispatch(new ToggleSkillAction({currentUIState, skill, toggled})); 
    
    }

}  