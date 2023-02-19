import { isDevMode, ModuleWithProviders, NgModule } from '@angular/core';
import { fromEvent, take } from 'rxjs';
import { NgxPerfJobQueueService } from './services/job-queue.service';
import { NgxPerfMeasureServiceProvider, ProvidePerformanceAPIWrapper } from './services/measure.service';
import { PerfConfigProvider } from './tokens/config.token';

/**
 * contains the core functionality for performance enhancement
 *
 * * job queue services
 * * measurements service
 */
@NgModule({
  declarations: [],
  exports: [],
  providers: [],
})
export class NgxPerfCoreModule {
  /** configure the performance library, use this only once in your app module */
  static forRoot(config: NgxPerfCoreModuleRootConfig): ModuleWithProviders<NgxPerfCoreModule> {

    this._warnProductionBuilds(config);

    return {
      ngModule: NgxPerfCoreModule,
      providers: [
        PerfConfigProvider({
          enableMeasures: config.includeAnalysis,
        }),
        ProvidePerformanceAPIWrapper(),
        NgxPerfMeasureServiceProvider(config.includeAnalysis),
        NgxPerfJobQueueService,
      ],
    };
  }

  /** show warnings if some bad-practices code are detected,
   * 
   * We only show warnings because in many cases, the developer should
   * actually know what they're doing, and we shouldn't limit them
   */
  private static _warnProductionBuilds(config: NgxPerfCoreModuleRootConfig) {
    // await document ready before calling `isDevMode`
    // this is because calling this function locks the internal `dev-mode` variable
    // in the angular core package, which causes the application to fail
    // if the variable is locked before calling `enableProductionMode()`
    fromEvent(document, "DOMContentLoaded").pipe(
      take(1)
    ).subscribe(()=>{
      if (isDevMode()) return;
      if (config.includeAnalysis) console.warn(WARNING_ANALYSIS_PRODUCTION);
    });
  }
}

export interface NgxPerfCoreModuleRootConfig {
  /** When set to `true`, ngx-performance will include marks/measures that are shown in the performance tab
   * set this to `true` when you are analysing your application, make sure it's `false` in
   * production builds
   */
  includeAnalysis: boolean;
}


/** warning message to be shown when production mode detected and library expected
 * to take performance measurements
 */
const WARNING_ANALYSIS_PRODUCTION = `\
ngx-perf detected production build. \
The analysis mode is turned on. \
If this is the live version, consider turning off \
analysis mode to improve your site's performance.
This is not a problem if you are doing internal tests.

Try with:
PerfCoreModule.forRoot({
  includeAnalysis: !environment.production
})
`;
