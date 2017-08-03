import {Component, Input, Output, EventEmitter} from '@angular/core';
import { Item } from '../item/item.model';
import { NavigationUI } from '../action/navigation.ui.model';

@Component({
    selector: 'navigator',
    template: `
        <button class="icon-button col-xs-1 button-up" [hidden]="items[0].order === currentNavigationUI.order" (click)="navigate.emit(-1)"><span class="glyphicon glyphicon-menu-up"></span></button>
        <button class="icon-button col-xs-1 button-down" [hidden]="items[items.length-1].order === currentNavigationUI.order" (click)="navigate.emit(1)"><span class="glyphicon glyphicon-menu-down"></span></button>
    `,
    styleUrls: ['./navigator.component.css']

})

export class NavigatorComponent {

 
    @Input() items: Item[];
    @Input() currentNavigationUI: NavigationUI;

    @Output() navigate: EventEmitter<number> = new EventEmitter<number>();

}