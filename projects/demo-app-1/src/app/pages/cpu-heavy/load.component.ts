import { Component, Input, ViewEncapsulation } from "@angular/core";



@Component({
    selector: "app-load-component",
    template: `heavy load component`,
})
export class DemoLoadComponent{
    /** duration in ms */
    @Input() loadDuration: number = 100;

    constructor(){
        this.__applyLoad(50, 'performance_marker');
    }

    /** apply a load until a time is elapsed
     * @param time in ms
     * @param name of the performance marker
     */
    private __applyLoad(time: number, name: string){
        const startTime = performance.now(),
              endTime = startTime + this.loadDuration;
        while(performance.now() < endTime) {};
    }
}