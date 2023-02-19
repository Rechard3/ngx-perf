import { Injectable } from '@angular/core';
import { perfNextMacroTask, PERF_NEXT_MACRO_TASK$ } from '../utils/job-queue';

@Injectable()
export class NgxPerfJobQueueService {

  constructor() {}

  readonly onNextMacroTask = perfNextMacroTask;
  readonly NEXT_MACRO_TASK$ = PERF_NEXT_MACRO_TASK$;
}
