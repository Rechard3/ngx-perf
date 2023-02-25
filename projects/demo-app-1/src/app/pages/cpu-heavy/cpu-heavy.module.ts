import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PerfDeferredRenderModule } from 'ngx-perf/dom-rendering';
import { OnVisibleModule } from 'ngx-perf/dom-rendering/src/on-visible/on-visible.module';
import { CpuHeavyComponent } from './cpu-heavy.component';
import { DemoLoadComponent } from './load.component';

/**
 * contains some pages/components that are CPU Intensive and widely affect the TBT metric
 */
@NgModule({
  declarations: [CpuHeavyComponent, DemoLoadComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: '', component: CpuHeavyComponent }]),
    PerfDeferredRenderModule,
    OnVisibleModule,
  ],
  exports: [],
})
export class DemoCPUHeavyModule {}
