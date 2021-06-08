import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PropertyDetailsRoutingModule } from './property-details-routing.module';
import {PropertyDetailsComponent} from './components/property-details/property-details.component';
import {SharedModule} from '../../../../shared/shared.module';
import { PropertyAdComponent } from './components/property-ad/property-ad.component';
import { RealEstateAgentComponent } from './components/real-estate-agent/real-estate-agent.component';
import { ScenarioComponent } from './components/scenario/scenario.component';
import { RentVsBuyingComponent } from './components/rent-vs-buying/rent-vs-buying.component';
import { PublicTransportComponent } from './components/public-transport/public-transport.component';
import { FeaturesComponent } from './components/features/features.component';
import { PieChartComponent } from './popups/pie-chart/pie-chart.component';
import { SharePropertyComponent } from './popups/share-property/share-property.component';
import { MultiFamilyComponent } from './components/multi-family/multi-family.component';
import { CalculatorComponent } from './popups/calculator/calculator.component';
import { MultiUnitInfoComponent } from './components/multi-unit-info/multi-unit-info.component';


@NgModule({
  declarations: [PropertyDetailsComponent, PropertyAdComponent, RealEstateAgentComponent, ScenarioComponent, RentVsBuyingComponent, PublicTransportComponent, FeaturesComponent, PieChartComponent, SharePropertyComponent, MultiFamilyComponent, CalculatorComponent, MultiUnitInfoComponent],
  imports: [
    CommonModule,
    PropertyDetailsRoutingModule,
    SharedModule
  ]
})
export class PropertyDetailsModule { }
