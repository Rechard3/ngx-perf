import { NgModule } from "@angular/core";
import { PerfIntersectionService } from "./intersection.service";
import { OnVisibleDirective } from "./on-visible.directive";
import { VisibilityAnchorDirective } from "./visibility-anchor.directive";



@NgModule({
  declarations: [
    OnVisibleDirective,
    VisibilityAnchorDirective,
  ],
  imports: [],
  exports: [
    OnVisibleDirective,
    VisibilityAnchorDirective
  ],
  providers: [
    PerfIntersectionService,
  ]
})
export class OnVisibleModule{}