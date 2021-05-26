import {
  AfterViewInit,
  ApplicationRef,
  Component,
  ComponentFactoryResolver,
  Injector,
  NgZone, OnInit,
  ViewChild
} from '@angular/core';
import {
  IArrow,
  ICommand,
  IGraph,
  PolylineEdgeStyle,
  OrganicEdgeRouter,
  Size,
  TreeLayout,
  TreeReductionStage,
  INode, NodeStylePortStyleAdapter, Point, ShapeNodeStyle, GraphTransformer, DefaultNodePlacer, Class, LayoutExecutor
} from 'yfiles';
import {EDGE_DATA, NODE_DATA} from '../../../../../../../../yFiles/demos-js/toolkit/angular/src/app/data';
import {GraphComponentComponent} from '../graph-component/graph-component.component';
import {NodeComponentStyle} from '../../nodeComponentStyle';
import { BuyerModel } from '../../models/referral-lineage.model';
Class.ensure(LayoutExecutor)
@Component({
  selector: 'app-referral-lineage',
  templateUrl: './referral-lineage.component.html',
  styleUrls: ['./referral-lineage.component.scss'],

})
export class ReferralLineageComponent implements OnInit, AfterViewInit{
  @ViewChild(GraphComponentComponent) gcComponent!: GraphComponentComponent;
  public currentPerson?: BuyerModel;

  // eslint-disable-next-line no-useless-constructor
  constructor(
    private _injector: Injector,
    private _resolver: ComponentFactoryResolver,
    private _appRef: ApplicationRef,
    private _zone: NgZone
  ) {}
  ngOnInit(): void {
  }

  ngAfterViewInit() {
    // run outside Angular so the change detection won't slow down yFiles
    this._zone.runOutsideAngular(() => {
      const graphComponent = this.gcComponent.graphComponent;
      const graph = graphComponent.graph

      graph.nodeDefaults.size = new Size(285, 100)
      graph.nodeDefaults.style = new NodeComponentStyle(
        this._injector,
        this._resolver,
        this._appRef,
        this._zone
      );

      graph.edgeDefaults.style = new PolylineEdgeStyle({
        stroke: '1px rgb(170, 170, 170)',
        targetArrow: IArrow.NONE
      });

      graphComponent.addCurrentItemChangedListener(() => {
        this.currentPerson = graphComponent.currentItem!.tag;
      });

      createSampleGraph(graph);

      runLayout(graph);

      var h = new GraphTransformer();
      h.scaleFactorY = 2;

      graphComponent.fitGraphBounds();
    });
  }
}

function createSampleGraph(graph: IGraph): void {
  const nodeMap: { [id: number]: INode } = {};

  const parentNodeCheck = true;
  FlatTree(NODE_DATA, parentNodeCheck, nodeMap, graph);

  EDGE_DATA.forEach(({ from, to }) => {
    const fromNode = nodeMap[from]
    const toNode = nodeMap[to]
    if (fromNode && toNode) {
      graph.createEdge(fromNode, toNode);
    }
  });

}

function runLayout(graph: IGraph): void {
  const treeLayout = new TreeLayout();
  const treeReductionStage = new TreeReductionStage();
  treeReductionStage.nonTreeEdgeRouter = new OrganicEdgeRouter();
  treeReductionStage.nonTreeEdgeSelectionKey = OrganicEdgeRouter.AFFECTED_EDGES_DP_KEY;
  treeLayout.defaultNodePlacer =  new DefaultNodePlacer(0, 3, 1, 3, 1, 50, 50, 0);
  treeLayout.appendStage(treeReductionStage);
  graph.applyLayout(treeLayout);
}

function FlatTree(root, parentNodeCheck, nodeMap, graph): void {
  if(parentNodeCheck){
    const nodeData = root;
    nodeMap[nodeData.id] = graph.createNode({
      tag: new BuyerModel(nodeData)
    });
    createPort(graph, nodeMap, nodeData, parentNodeCheck);
    parentNodeCheck = false;
  }
  for (const nodeData of root.children) {
    nodeMap[nodeData.id] = graph.createNode({
      tag: new BuyerModel(nodeData)
    });
    createPort(graph, nodeMap, nodeData, parentNodeCheck);
    FlatTree(nodeData, parentNodeCheck, nodeMap, graph);
  }
}

function createPort(graph, nodeMap, nodeData, parentNodeCheck): void {
  const green = '#53E773';
  const gray = '#B3B7C0';
  let color = green;
  if (parentNodeCheck) {
    addPort(graph, nodeMap, nodeData, green, 142.5, 104 );
  }
  else {
      if (nodeData.children.length === 0) { // Leafs
        color = nodeData.dealStatus === 'Closed' ? gray : green;
        addPort(graph, nodeMap, nodeData, color, 142.5, -5 );
      }
      else{
        color = nodeData.dealStatus === 'Closed' ? gray : green;
        addPort(graph, nodeMap, nodeData, color, 142.5, -5 );
        addPort(graph, nodeMap, nodeData, color, 142.5, 104 );
      }
  }
}

function addPort(graph, nodeMap, nodeData, color, x, y): void {
  const parentPortStyle = new NodeStylePortStyleAdapter(
    new ShapeNodeStyle({fill: color, stroke: 'transparent', }));
  parentPortStyle.renderSize = new Size(10, 10);
  graph.addPortAt(nodeMap[nodeData.id], new Point(x, y), parentPortStyle);
}
