import { Directive, ElementRef, InjectionToken } from "@angular/core";
import { filter, Observable, shareReplay, take } from "rxjs";
import { PerfIntersectionService } from "./intersection.service";

export interface VisibilityAnchor{
  readonly elementRef: ElementRef<any>;

  getVisibilityTrigger(): Observable<IntersectionObserverEntry>;
}
export const VisibilityAnchor = new InjectionToken<VisibilityAnchor>('foobar');

@Directive({
  selector: '[visibility-anchor],[visibilityAnchor]',
  exportAs: 'visibility-anchor',
  providers: [
    {provide: VisibilityAnchor, useExisting: VisibilityAnchorDirective},
  ]
})
export class VisibilityAnchorDirective implements VisibilityAnchor{
  constructor(
    public readonly elementRef: ElementRef<any>,
    private _intersection: PerfIntersectionService,
  ){}

  private _visibilityTrigger$ = this._intersection.observe(this.elementRef).pipe(
    filter(entry => entry.intersectionRatio >= 0.001),
    shareReplay(1),
  );

  getVisibilityTrigger(): Observable<any> {
    return this._visibilityTrigger$;
  }
}