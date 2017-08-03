import {Component, Input} from '@angular/core';
import { Item } from '../item/item.model';

@Component({
    selector: 'contact',
    template: `
        <h3>{{item.title}}</h3>
        <br>
        <br>
           
        <div class="row">

        <div *ngFor="let channel of item.channels" class="col-sm-6">
        <a href="{{channel.url}}" target="_blank"><h4>@{{channel.title}}</h4><img src="../assets/images/{{channel.image}}"/></a>
        </div>

        </div>
        
        <div class="row email">
        <div class="col-sm-offset-3 col-sm-6"><h4>{{item.email.title}}</h4><h5>{{item.email.address}}</h5></div>
        </div>
      `,
    styleUrls: ['./contact.component.css']

})

export class ContactComponent {

    @Input() item: Item;

}