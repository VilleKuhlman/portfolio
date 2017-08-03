import {Component, Input} from '@angular/core';
import { Item } from '../item/item.model';

@Component({
    selector: 'intro',
    template: `  
    <div class="outer col-xs-11 col-sm-8">
    <h3>{{item.title}}</h3>
    <br>
    <div class="inner">{{item.text}}</div>
    </div>    
      `,
    styleUrls: ['./intro.component.css']

})

export class IntroComponent {

     @Input() item: Item;

}