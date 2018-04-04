import {Component, Input, ChangeDetectionStrategy} from '@angular/core';
import { SkillsearchUI } from '../action/skillsearch.ui.model';
import { Skill } from './skill.model';
import { ToggleSkillAction } from '../shared/shared.actions';

import * as fromRoot from '../shared/main.reducer';
import { Store } from '@ngrx/store';

@Component({
    selector: 'skill',
    template: `
    <div>{{skill.title}}</div>
    <span class="fas fa-plus float-right" (click)="toggleskill(true)" [hidden]="currentSkillsearchUI.toggledskills.includes(skill.id)"></span>
    <span class="fas fa-minus float-right" (click)="toggleskill(false)" [hidden]="!currentSkillsearchUI.toggledskills.includes(skill.id)"></span>
    <br><br>
    <div class="description" [hidden]="!currentSkillsearchUI.toggledskills.includes(skill.id)">
    Last Used: {{skill.used | currentDate}}
    <br>
    Experience: {{skill.experience}} years
    </div>
    `,
    styleUrls: ['./skill.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,

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