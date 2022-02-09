import {
  AfterViewInit,
  Component,
  ComponentRef,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { BrowserJsPlumbInstance } from '@jsplumb/browser-ui';
import { AnchorLocations } from '@jsplumb/common';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css'],
})
export class ChartComponent implements OnInit, AfterViewInit, OnDestroy {
  private browserJsPlumbInstance!: BrowserJsPlumbInstance;
  @ViewChild('canvas') canvasElement!: ElementRef;

  nodeGroup: FormGroup;
  nodes: FormArray;

  constructor(private formBuilder: FormBuilder) {
    this.nodes = formBuilder.array([]);
    this.nodeGroup = formBuilder.group({ nodes: this.nodes });
  }

  ngOnDestroy(): void {}

  ngAfterViewInit(): void {
    this.browserJsPlumbInstance = new BrowserJsPlumbInstance(0, {
      dragOptions: { cursor: 'pointer', zIndex: 2000 },
      paintStyle: { stroke: '#666' },
      endpointHoverStyle: { fill: 'orange' },
      hoverPaintStyle: { stroke: 'orange' },
      endpointStyle: { width: 20, height: 16, stroke: '#666' },
      endpoint: 'Rectangle',
      container: this.canvasElement.nativeElement,
      anchors: [AnchorLocations.TopRight, AnchorLocations.TopRight],
    });

    this.browserJsPlumbInstance.manageAll('.dnd');
  }

  ngOnInit(): void {
    for (let x = 0; x < 10; ++x) {
      const node = this.formBuilder.group({
        id: x,
        title: 'Test' + x,
        desc: 'Dummy',
      });

      this.nodes.insert(0, node);
    }
  }
}
