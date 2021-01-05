import { AfterViewInit, Component, ElementRef, NgZone, ViewChild } from '@angular/core';
import { GraphComponent, GraphViewerInputMode } from 'yfiles';

@Component({
  selector: 'app-graph-component',
  templateUrl: './graph-component.component.html',
  styleUrls: ['./graph-component.component.scss']
})
export class GraphComponentComponent implements AfterViewInit {

  @ViewChild('graphComponentRef') graphComponentRef!: ElementRef
  graphComponent!: GraphComponent

  private zone: NgZone

  constructor(zone: NgZone) {
    this.zone = zone
  }

  ngAfterViewInit(): void {
    // run outside Angular so the change detection won't slow down yFiles
    this.zone.runOutsideAngular(() => {
      this.graphComponent = new GraphComponent(this.graphComponentRef.nativeElement)
      this.graphComponent.inputMode = new GraphViewerInputMode({
        clickableItems: 'none',
      })
    })
  }
}
