import { Injectable, InjectionToken, Provider } from "@angular/core";

export const Performance = new InjectionToken<Performance>('ngx-perf | performance api wrapper');
export function ProvidePerformanceAPIWrapper(): Provider{
  function noop(...args: any[]){}
  return {
    provide: Performance,
    useValue: performance ?? <Performance>{
      mark: noop,
      measure: noop,
      clearMarks: noop,
      clearMeasures: noop,
    },
  };
}

/** this service is responsible for all measurements
 * 
 * this is actually a light-weight injection token
 */
@Injectable()
export abstract class NgxPerfMeasureService{
  /** register a mark on the performance tab in dev-tools */
  abstract mark(name: string): PerformanceMark | undefined;

  /** request a measurement from the performance API */
  abstract measure(measureName: string, mark1: string, mark2: string): PerformanceMeasure | undefined;
}

export function NgxPerfMeasureServiceProvider(enableMeasures: boolean): Provider{
  return {
    provide: NgxPerfMeasureService,
    useClass: enableMeasures ? _MeasureImplementation : _MeasureNoop,
  };
}


/** Implementation of the measurement service,
 * for more info check the light-weight token `NgxPerfMeasureService`
 */
@Injectable()
class _MeasureImplementation implements NgxPerfMeasureService{
  constructor(
    private _performance: Performance,
  ){}
  mark(name: string) {
    return this._performance.mark(name);
  }

  measure(measureName: string, mark1: string, mark2: string) {
    return this._performance.measure(measureName, mark1, mark2);
  }
}


/** no-op service for the light-weight token `NgxPerfMeasureService` */
@Injectable()
class _MeasureNoop implements NgxPerfMeasureService{
  mark(name: string) {return undefined;}
  measure(measureName: string, mark1: string, mark2: string) {return undefined;}
}