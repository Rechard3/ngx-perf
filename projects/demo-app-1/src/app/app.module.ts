import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgxPerfCoreModule } from 'ngx-perf/core/src/core.module';
import { environment } from '../environments/environment';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxPerfCoreModule.forRoot({
      includeAnalysis: true,
    }),
  ],
  providers: [
    {provide: Performance, useFactory: ()=>performance},
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
