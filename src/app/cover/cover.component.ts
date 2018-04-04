import {Component, Input, ChangeDetectionStrategy} from '@angular/core';
import { Item } from '../item/item.model';

@Component({
    selector: 'cover',
    template: `
        <img class="col-8" src="../assets/images/profile.png" />
        <h3>{{item.name}}</h3>
        <h4>{{item.title}}</h4>
      `,
    styleUrls: ['./cover.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,

})

export class CoverComponent {

     @Input() item: Item;

}