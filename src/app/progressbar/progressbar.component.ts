import {Component, Input} from '@angular/core';
import { NavigationUI } from '../action/navigation.ui.model';
import { Item } from '../item/item.model';   

@Component({
    selector: 'progressbar',
    template: `
    <div *ngFor="let item of items; let i=index" [ngStyle]="setStyles()" class="dot-container">
      <span [ngClass]="{'active-dot':currentNavigationUI.order === i+1}"
      class="dot"></span>
    </div>
    `,
    styleUrls: ['./progressbar.component.css']

})

export class ProgressbarComponent {

    @Input() currentNavigationUI: NavigationUI;
    @Input() items: Item[];

    setStyles() {   

        let styles = {  
            'top':((this.currentNavigationUI.order-1)*-30).toString()+"px"        
        };
        return styles;
    }

}  
   
   
