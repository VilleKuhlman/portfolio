import {Component, Input, Output, EventEmitter, ChangeDetectionStrategy} from '@angular/core';
import { Item } from '../item/item.model';
import { NavigationUI } from '../action/navigation.ui.model';

@Component({
    selector: 'navigator',
    template: `
        <button class="icon-button col-2 button-up" [hidden]="items[0].order === currentNavigationUI.order" (click)="navigate.emit(-1)"><span class="fas fa-chevron-up"></span></button>
        <button class="icon-button col-2 button-down" [hidden]="items[items.length-1].order === currentNavigationUI.order" (click)="navigate.emit(1)"><span class="fas fa-chevron-down"></span></button>
    `,
    styleUrls: ['./navigator.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})

export class NavigatorComponent {

    @Input() items: Item[];
    @Input() currentNavigationUI: NavigationUI;
    @Output() navigate: EventEmitter<number> = new EventEmitter<number>();
    
}