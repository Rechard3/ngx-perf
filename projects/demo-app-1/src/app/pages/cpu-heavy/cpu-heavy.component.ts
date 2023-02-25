import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { interval } from 'rxjs';

@Component({
  selector: 'app-cpu-heavy',
  templateUrl: './cpu-heavy.component.html',
  styleUrls: ['./cpu-heavy.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CpuHeavyComponent implements OnInit {

  @Input() running = false;

  readonly loadObservable$ = interval(0);

  constructor(
    private _cdRef: ChangeDetectorRef,
  ) {
  }

  ngOnInit(): void {
  }

  setPerformanceMark(){
  }

  toggleRunning(){
    this.running = !this.running;
    this._cdRef.detectChanges();
  }
}
