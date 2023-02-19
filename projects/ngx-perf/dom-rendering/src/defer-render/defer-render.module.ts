import { NgModule } from "@angular/core";
import { PerfDeferredRenderDirective } from "./deferred-render.directive";


@NgModule({
    declarations: [PerfDeferredRenderDirective],
    exports: [
        PerfDeferredRenderDirective,
    ],
})
export class PerfDeferredRenderModule{}