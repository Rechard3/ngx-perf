import { ElementRef, Injectable } from "@angular/core";
import { filter, map, shareReplay, Subject } from "rxjs";


/** benchmarks suggest that shared intersection observer is much faster than 
 * creating a separate isection observer for each observed element
 */

/** wraps the intersection observer */
@Injectable()
export class PerfIntersectionService{
  private readonly _visibilityChanged: IntersectionObserverCallback = (entries, observer) => {
    const entryMap = new Map<Element, IntersectionObserverEntry>();
    entries.forEach(entry => entryMap.set(entry.target, entry));
    this._intersectionEntries$.next(entryMap);
  };
  private readonly _intersection = new IntersectionObserver(this._visibilityChanged);
  private readonly _intersectionEntries$ = new Subject<Map<Element, IntersectionObserverEntry>>();

  constructor(){
  }


  observe<T extends Element>(elRef: ElementRef<T>){
    this._intersection.observe(elRef.nativeElement);
    return this._getIntersectionTriggerFor(elRef);
  }

  private _getIntersectionTriggerFor(elRef: ElementRef<any>){
    return this._intersectionEntries$.pipe(
      map(entriesMap => entriesMap.get(elRef.nativeElement)),
      filter((item): item is IntersectionObserverEntry => item !== undefined && item !== null),
      shareReplay(1),
    );
  }
}