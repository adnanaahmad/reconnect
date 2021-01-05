import { ApplicationRef, ComponentFactoryResolver, Injector, NgZone } from '@angular/core'
import { INode, IRenderContext, NodeStyleBase, SvgVisual, Visual } from 'yfiles'
import {NodeComponent} from './components/node/node.component';
import {BuyerModel} from './models/referral-lineage.model';

export class NodeComponentStyle extends NodeStyleBase {
  constructor(
    private readonly injector: Injector,
    private resolver: ComponentFactoryResolver,
    private appRef: ApplicationRef,
    private zone: NgZone
  ) {
    super()
  }

  createVisual(renderContext: IRenderContext, node: INode) {
    const g = document.createElementNS('http://www.w3.org/2000/svg', 'g')
    g.setAttribute('transform', 'translate(' + node.layout.x + ' ' + node.layout.y + ')')

    // Retrieve the factory for NodeComponents
    const componentFactory = this.resolver.resolveComponentFactory(NodeComponent)
    // Have the factory create a new NodeComponent as a child of the new SVG g element.
    const compRef = componentFactory.create(this.injector, undefined, g)
    // Attach the component to the Angular component tree so that change detection will work
    this.appRef.attachView(compRef.hostView)
    // Assign the NodeComponent's item input property
    this.zone.run(() => {
      // run inside the zone so Angular will update the NodeComponent
      compRef.instance.item = node.tag as BuyerModel;
      compRef.instance.zoom = renderContext.zoom;
    })
    ;(g as any)['data-compRef'] = compRef

    const svgVisual = new SvgVisual(g)
    renderContext.setDisposeCallback(
      svgVisual,
      (context: IRenderContext, visual: Visual, dispose: boolean) => {
        // need to clean up after the visual is actually removed
        const listener = () => {
          this.appRef.detachView(compRef.hostView)
          compRef.destroy()
          context.canvasComponent!.removeUpdatedVisualListener(listener)
        }
        context.canvasComponent!.addUpdatedVisualListener(listener)
        return null
      }
    )
    return svgVisual
  }

  updateVisual(renderContext: IRenderContext, oldVisual: SvgVisual, node: INode) {
    if (oldVisual && oldVisual.svgElement) {
      const g = oldVisual.svgElement
      g.setAttribute('transform', 'translate(' + node.layout.x + ' ' + node.layout.y + ')')
      this.zone.run(() => {
        // run inside the zone so Angular will update the NodeComponent
        ;(g as any)['data-compRef'].instance.zoom = renderContext.zoom
      })
      return oldVisual
    }
    return this.createVisual(renderContext, node)
  }
}
