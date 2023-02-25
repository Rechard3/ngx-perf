import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path: 'cpu-heavy', loadChildren: () => import("./pages/cpu-heavy/cpu-heavy.module").then(m=>m.DemoCPUHeavyModule)},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
