import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { BrowserJsPlumbInstance } from '@jsplumb/browser-ui';
import { v4 as uuidv4 } from 'uuid';
import { ChartDto } from '../model/chart.dto';
import { AnchorLocations } from '@jsplumb/common';
import { Connection, EndpointOptions } from '@jsplumb/core';
import { NodeDto } from '../model/node.dto';
import { ConnectionDto } from '../model/connection.dto';
import { EndpointDto } from '../model/endpoint.dto';
import { RectDto } from '../model/rect.dto';

@Component({
  selector: 'app-chart-view',
  templateUrl: './chart-view.component.html',
  styleUrls: ['./chart-view.component.css'],
})
export class ChartViewComponent implements OnInit, AfterViewInit, OnChanges {
  @ViewChild('canvas') canvasElement!: ElementRef;

  @Output('export') exportEvent = new EventEmitter<string>();
  @Input() chart: string = '';
  @Input() triggerExport: boolean = false;

  nodeGroup: FormGroup;
  nodes: FormArray;

  private browserJsPlumbInstance!: BrowserJsPlumbInstance;

  constructor(private formBuilder: FormBuilder) {
    this.nodes = this.formBuilder.array([]);
    this.nodeGroup = this.formBuilder.group({ nodes: this.nodes });
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['triggerExport'] && !changes['triggerExport'].firstChange) {
      this.toJson();
    }
    if (changes['chart'] && !changes['chart'].firstChange) {
      const json = changes['chart'];
      this.fromJson();
    }
  }

  ngOnInit(): void {
    for (let x = 0; x < 3; ++x) {
      const node = this.formBuilder.group({
        id: uuidv4(),
        title: 'Test' + x,
        desc: 'Dummy',
        top: 0,
        left: x * 20,
        style: `top: 0px; left:${x}${5}px`,
      });

      this.nodes.insert(0, node);
    }

    this.onChanges();
  }

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

    //this.browserJsPlumbInstance.manageAll('.dnd');

    this.browserJsPlumbInstance.batch(() => {
      this.browserJsPlumbInstance.bind(
        'connection:click',
        (component, originalEvent) => {
          if (component instanceof Connection) {
            const connection = component as Connection;

            const label = window.prompt('Set label:');

            if (label) {
              connection.setLabel(label);
            }
          }
        }
      );

      this.browserJsPlumbInstance.bind(
        'connection',
        (info, originalEvent) => {}
      );

      this.nodes.controls.forEach((control) => {
        this.browserJsPlumbInstance.addEndpoint(
          document.getElementById(control.get('id')?.value)!,
          { anchor: [0.5, 1, 0, 1] },
          this.createEndpoint()
        );
      });
    });
  }

  private createEndpoint(): EndpointOptions {
    const example3Color = 'rgba(229,219,61,0.5)';
    return {
      endpoint: { type: 'Dot', options: { radius: 17 } },
      anchor: 'BottomLeft',
      paintStyle: { fill: example3Color },
      source: true,
      scope: 'yellow',
      connectorStyle: {
        stroke: example3Color,
        strokeWidth: 4,
      },
      connector: 'Straight',
      target: true,
      maxConnections: -1,
      uuid: uuidv4(),
    };
  }

  public toJson() {
    const nodes: NodeDto[] = [];
    const connections: ConnectionDto[] = [];

    const elements = this.browserJsPlumbInstance.getManagedElements();
    Object.entries(elements).forEach((managed) => {
      const id = managed[0];
      const element = managed[1];

      const endpoints: EndpointDto[] = [];
      element.endpoints?.forEach((endpoint) => {
        endpoints.push(new EndpointDto(endpoint.uuid));

        endpoint.connections.forEach((connection) => {
          connections.push(
            new ConnectionDto(connection.sourceId, connection.targetId)
          );
        });
      });

      nodes.push(
        new NodeDto(
          id,
          'Test',
          new RectDto(
            element.viewportElement?.x,
            element.viewportElement?.y,
            element.viewportElement?.w,
            element.viewportElement?.h
          ),
          endpoints
        )
      );
    });

    this.exportEvent.emit(
      JSON.stringify(new ChartDto('Test', nodes, connections))
    );
  }

  public fromJson() {
    this.nodeGroup.reset();
    this.nodes.reset();
    this.nodes = this.formBuilder.array([]);

    this.browserJsPlumbInstance.reset();

    const chart: ChartDto = JSON.parse(this.chart);

    chart.nodes.forEach((node) => {
      const nodeGroup = this.formBuilder.group({
        id: uuidv4(),
        title: node.title,
        desc: 'Dummy',
        top: node.rect.y,
        left: node.rect.x,
        style: `top: ${node.rect.y}px; left:${node.rect.x}px`,
      });

      this.nodes.insert(0, nodeGroup);
    });
  }

  addNode() {
    const node = this.formBuilder.group({
      id: uuidv4(),
      title: 'Test',
      desc: 'Dummy',
      top: 0,
      left: 0,
      style: `top: 0px; left:0px`,
    });

    this.nodes.insert(0, node);
  }

  onChanges(): void {}

  onDomChange(event: MutationRecord) {
    event.addedNodes?.forEach((node) => {
      if (node.nodeType == node.ELEMENT_NODE) {
        const e: Element = node as Element;
        if (null != e.id && '' !== e.id) {
          if (
            !this.browserJsPlumbInstance
              .getEndpoints(document.getElementById(e.id)!)
              .find((endpoint) => {
                endpoint.getId() == e.id;
              })
          ) {
            this.browserJsPlumbInstance.addEndpoint(
              document.getElementById(e.id)!,
              { anchor: [0.5, 1, 0, 1] },
              this.createEndpoint()
            );
          }
        }
      }
    });
  }
}
