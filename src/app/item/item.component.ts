import {
  Component, Input, Output, EventEmitter, NgZone, ApplicationRef,
  ViewChild, ElementRef
} from '@angular/core';
import { Item } from './item.model';
import { SkillsearchUI } from '../action/skillsearch.ui.model';
import { NavigationUI } from '../action/navigation.ui.model';
import * as fromRoot from '../shared/main.reducer';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/throttleTime';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/merge';
import 'rxjs/add/operator/concatMap'
import 'rxjs/add/observable/empty';
import 'rxjs/add/operator/first';
import 'rxjs/add/operator/takeUntil';
import 'rxjs/add/operator/elementAt';  


@Component({
  selector: 'items',
  template: `
    <div #item class="item">
    <div *ngFor="let item of items" class="item container-fluid">
    <cover *ngIf="item.type === 'cover'" [item]="item"></cover>
    <intro *ngIf="item.type === 'intro'" [item]="item"></intro>
    <skillsearch *ngIf="item.type === 'skillsearch'" [currentSkillsearchUI]="currentSkillsearchUI" [skills]="item.skills"></skillsearch>
    <contact *ngIf="item.type === 'contact'" [item]="item"></contact>
    </div>
    <progressbar
      [items]="items"
      [currentNavigationUI]="currentNavigationUI"
    ></progressbar>
    </div>

  `,
  styleUrls: ['./item.component.css'],

})
export class ItemComponent {
  @Input() items: Item[];
  @Input() currentSkillsearchUI: SkillsearchUI;
  @Input() currentNavigationUI: NavigationUI;

  @ViewChild('item') itemsElRef: ElementRef;

  constructor(private store: Store<fromRoot.State>, private ngzone: NgZone,
    private appref: ApplicationRef) { };

  @Output() navigate: EventEmitter<number> = new EventEmitter<number>();

  /*
  
  A more efficient technique is to create RxJS Observables yourself from the events, outside of Angular's "zone". 
  This way, the component change detection is not called each time an event fires. 
  
  */

  ngAfterViewInit() {
    this.ngzone.runOutsideAngular(() => {
      Observable.fromEvent(this.itemsElRef.nativeElement, 'mousewheel')
        .throttleTime(300)
        .subscribe(event => {
          this.mouseWheelFunc(event);
          this.appref.tick();
        });
      Observable.fromEvent(this.itemsElRef.nativeElement, 'DOMMouseScroll')
        .throttleTime(300)
        .subscribe(event => {
          this.mouseWheelFunc(event);
          this.appref.tick();
        });
      Observable.fromEvent(this.itemsElRef.nativeElement, 'onmousewheel')
        .throttleTime(300)
        .subscribe(event => {
          this.mouseWheelFunc(event);
          this.appref.tick();
        });
    });



    /* SWIPE EVENTS */

      const mouseEventToCoordinate = mouseEvent => {

       
        return {
          x: mouseEvent.clientX,
          y: mouseEvent.clientY
        };
      };

      const touchEventToCoordinate = touchEvent => {

        
        return {
          x: touchEvent.changedTouches[0].clientX,
          y: touchEvent.changedTouches[0].clientY
        };
      };

      const mouseDowns = Observable.fromEvent(this.itemsElRef.nativeElement, "mousedown").map(mouseEventToCoordinate);
      const mouseMoves = Observable.fromEvent(window, "mousemove").map(mouseEventToCoordinate);
      const mouseUps = Observable.fromEvent(window, "mouseup").map(mouseEventToCoordinate);

      const touchStarts = Observable.fromEvent(this.itemsElRef.nativeElement, "touchstart").map(touchEventToCoordinate);
      const touchMoves = Observable.fromEvent(this.itemsElRef.nativeElement, "touchmove").map(touchEventToCoordinate);
      const touchEnds = Observable.fromEvent(window, "touchend").map(touchEventToCoordinate);


      const starts = mouseDowns.merge(touchStarts);
      const moves = mouseMoves.merge(touchMoves);
      const ends = mouseUps.merge(touchEnds);

      // Move starts with direction: Pair the move start events with the 3rd subsequent move event,
      // but only if no end event happens in between
      let moveStartsWithDirection = starts.concatMap(dragStartEvent =>
        moves
          .takeUntil(ends)
          .elementAt(3)
          .catch(err => Observable.empty())
          .map(dragEvent => {
              
            const intialDeltaX = (<any>dragEvent).x - dragStartEvent.x;
            const initialDeltaY = (<any>dragEvent).y - dragStartEvent.y;

            return { x: dragStartEvent.x, y: dragStartEvent.y, intialDeltaX, initialDeltaY };

          })

      );

      // Vertical move starts: Keep only those move start events 
      // where the 3rd subsequent move event is rather vertical than horizontal
      let verticalMoveStarts = moveStartsWithDirection.filter(dragStartEvent =>
        Math.abs(dragStartEvent.intialDeltaX) < Math.abs(dragStartEvent.initialDeltaY)
      );

      // Horizontal move starts: Keep only those move start events 
      // where the 3rd subsequent move event is rather horizontal than vertical
      let horizontalMoveStarts = moveStartsWithDirection.filter(dragStartEvent =>
        Math.abs(dragStartEvent.intialDeltaX) >= Math.abs(dragStartEvent.initialDeltaY)
      );

      // Take the moves until an end occurs
      const movesUntilEnds = dragStartEvent =>
        moves.takeUntil(ends).map(dragEvent => {
          const x = dragEvent.x - dragStartEvent.x;
          const y = dragEvent.y - dragStartEvent.y;
          return { x, y };
        });


      const lastMovesAtEnds = dragStartEvent =>
        ends.first().map(dragEndEvent => {
          const x = dragEndEvent.x - dragStartEvent.x;
          const y = dragEndEvent.y - dragStartEvent.y;
          return { x, y };
        });

      let verticalMoveEnds = verticalMoveStarts.concatMap(lastMovesAtEnds).filter(coordinate => coordinate.y > 50 || coordinate.y < -50).forEach(coordinate => {
           
        if(coordinate.y > 0 && (this.items[0].order === this.currentNavigationUI.order) === false && (this.currentNavigationUI.order !== 3 || this.currentSkillsearchUI.toggledskillsearch !== true)){

          this.navigate.emit(-1);

        }else if(coordinate.y < 0 && (this.items[this.items.length-1].order === this.currentNavigationUI.order) === false && (this.currentNavigationUI.order !== 3 || this.currentSkillsearchUI.toggledskillsearch !== true)){

          this.navigate.emit(1);
        }
        
       });

    }

    /* SWIPE EVENTS */


  mouseWheelFunc(event: any) {

    var event = window.event || event; // old IE support

    const delta = Math.max(-1, Math.min(1, (event.wheelDelta || -event.detail)));

    if (delta > 0 && (this.items[0].order === this.currentNavigationUI.order) === false && (this.currentNavigationUI.order !== 3 || this.currentSkillsearchUI.toggledskillsearch !== true)) {
      this.navigate.emit(-1);
    } else if (delta < 0 && (this.items[this.items.length-1].order === this.currentNavigationUI.order) === false && (this.currentNavigationUI.order !== 3 || this.currentSkillsearchUI.toggledskillsearch !== true)) {
      this.navigate.emit(1);
    }
    // for IE
    event.returnValue = false;
    // for Chrome and Firefox
    if (event.preventDefault) {
      event.preventDefault();
    }
  }


}

