import { Directive, EmbeddedViewRef, Input, OnChanges, OnDestroy, OnInit, Optional, Self, SimpleChanges, SkipSelf, TemplateRef, ViewContainerRef } from '@angular/core';
import { NgxPerfMeasureService } from 'ngx-perf/core';
import { Subject, takeUntil } from 'rxjs';
import { VisibilityAnchor } from './visibility-anchor.directive';

@Directive({
  selector: '[perfOnVisible],[perf-on-visible]'
})
export class OnVisibleDirective<T> implements OnInit, OnChanges, OnDestroy{

  @Input('perfOnVisible') inputVisibilityAnchor: VisibilityAnchor | undefined = this._injectedVisibilityAnchor;

  constructor(
    private _measures: NgxPerfMeasureService,
    @Self() private _vcRef: ViewContainerRef,
    @Self() private _template: TemplateRef<T>,
    @SkipSelf() @Optional() private _injectedVisibilityAnchor?: VisibilityAnchor,
  ) {
    // if called in `ngOnInit`, then there are cases when this will be called once in
    // `ngOnChanges` and then again very soon at `ngOnInit`
    // this case is not required. If the inputs change, then it's called in `ngOnChanges`
    // if the inputs haven't changed, then it should only be called in the constructor
    this._handleVisibilityAnchorChanged();
  }

  /** holds the id of the next instance of this directive */
  private static _nextInstanceId = 0;
  /** holds the id of this instance of this directive */
  private readonly _instanceId = `on-visible-directive-${OnVisibleDirective._nextInstanceId ++}`;
  /** name of the start marker shown in the performance tab */
  private readonly startMarkId = `${this._instanceId}-start`;
  /** name of the end marker shown in the performance tab */
  private readonly endMarkId = `${this._instanceId}-end`;
  /** name of the measure shown in the performance tab
   * this is the measure of the time taken to render the template
   */
  private readonly measureId = `${this._instanceId}-measure`;
  
  /** the visibility anchor in effect, this can be either the injected anchor
   * or can be overriden by providing an input value for visbility anchor
   */
  private _effectiveVisibilityAnchor: VisibilityAnchor | undefined = this._injectedVisibilityAnchor;
  /** emits whenever the effective visibility anchor changes */
  private readonly visAnchorChanged$ = new Subject<VisibilityAnchor>();
  /** if the template is already rendered, just do nothing */
  private _renderedTemplate: EmbeddedViewRef<any> | undefined;
  /** emits next in `ngOnDestroy`, use to cleanup subscriptions */
  private readonly _destroy$ = new Subject<void>();


  ngOnInit(){
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['inputVisibilityAnchor']) this._handleVisibilityAnchorChanged();
  }

  ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }

  /** renders the associated template, finishing the directive's job */
  private readonly _onVisibleTriggered = (entry: IntersectionObserverEntry) => {
    if(this._renderedTemplate) return this.visAnchorChanged$.complete();
    this._measures.mark(this.startMarkId);
    this._renderedTemplate = this._vcRef.createEmbeddedView(this._template);
    this._measures.mark(this.endMarkId);
    this._measures.measure(this.measureId, this.startMarkId, this.endMarkId);
    // stop all subscribers, we finished rendering the template
    this.visAnchorChanged$.complete();
  }

  /** handle changes to the visibility anchor */
  private _handleVisibilityAnchorChanged(){
    this._effectiveVisibilityAnchor = this.inputVisibilityAnchor ?? this._injectedVisibilityAnchor;
    if(!this._effectiveVisibilityAnchor) return ;
    this.visAnchorChanged$.next(this._effectiveVisibilityAnchor!);
    // no need for cleanup, the subject is being completed once the template is rendered
    // only unsubscribe on destroy
    this._effectiveVisibilityAnchor.getVisibilityTrigger().pipe(
      takeUntil(this._destroy$),
    ).subscribe(this._onVisibleTriggered);
  }
}
