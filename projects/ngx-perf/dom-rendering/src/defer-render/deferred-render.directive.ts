import {
  Directive,
  EmbeddedViewRef,
  OnInit,
  Self,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import { NgxPerfJobQueueService } from 'ngx-perf/core';
import { NgxPerfMeasureService } from 'ngx-perf/core';
import { PerfConfig } from 'ngx-perf/core';


/** defers rendering the target template to the next macro task
 * 
 * @example
 * ```html
 * <app-foo *perfDeferredRender></app-foo>
 * ```
 * this will delay rendering `app-foo` component to the next macro task
*/
@Directive({ selector: '[perfDeferredRender]' })
export class PerfDeferredRenderDirective implements OnInit {
  static readonly FeatureName = 'DEFERRED-RENDER-DIRECTIVE';
  private static nextInstanceId = 0;

  constructor(
    private _measure: NgxPerfMeasureService,
    private _jobQueue: NgxPerfJobQueueService,
    private _config: PerfConfig,
    @Self() private _vcRef: ViewContainerRef,
    @Self() private _templateRef: TemplateRef<any>
  ) {}


  private _instanceId = `deferred-render-instance-${PerfDeferredRenderDirective.nextInstanceId++}`;
  private _startMarkName = `${this._instanceId}-start`;
  private _endMarkName = `${this._instanceId}-end`;
  private _measureName = `${this._instanceId}-measure`;

  ngOnInit(): void {
    this._jobQueue.NEXT_MACRO_TASK$.subscribe(() => {
      this._measure.mark(this._startMarkName);
      const embeddedView = this._vcRef.createEmbeddedView(this._templateRef);
      this._measure.mark(this._endMarkName);
      const measure = this._measure.measure(this._measureName, this._startMarkName, this._endMarkName);
      // if analysis is turned off, then measure will be undefiend
      // only log when analysis is on
      measure && this._notifyWithMeasure(measure, embeddedView);
    });
  }


  private _notifyWithMeasure(measure: PerformanceMeasure, embeddedView: EmbeddedViewRef<Element>){
    if(measure.duration > 50){
      console.warn(
        "[PERF] - Heavy tree rendered.\nConsider splitting the tree with more deferred rendering\n",
        {
          renderedElements: embeddedView.rootNodes,
          renderDuration: measure.duration.toFixed(0) + 'ms',
        },
      );

    }
  }
}
