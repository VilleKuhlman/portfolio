import { Item } from '../item/item.model';

export class Portfolio {

  constructor(public items: Array<Item>){

    this.items = items;
    
  }
  
}