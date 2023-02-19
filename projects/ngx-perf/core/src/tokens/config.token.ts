import { InjectionToken, Provider } from "@angular/core";


export type PerfConfig = {
  enableMeasures: boolean;
};
export const PerfConfig = new InjectionToken<PerfConfig>('ngx-perf|config');
export const PerfConfigProvider = function(config: PerfConfig): Provider{
  return {
    provide: PerfConfig,
    useValue: config,
  };
}