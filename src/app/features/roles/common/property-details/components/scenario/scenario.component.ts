import {Component, Input, OnInit} from '@angular/core';
import {PieChartComponent} from '../../popups/pie-chart/pie-chart.component';
import {NgbModal, NgbModalConfig} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-scenario',
  templateUrl: './scenario.component.html',
  styleUrls: ['./scenario.component.scss']
})
export class ScenarioComponent implements OnInit {
  @Input() loanScenario;
  @Input() scenarioNumber;
  constructor(private modalService: NgbModal, configuration: NgbModalConfig) {
    configuration.size = 'lg';
    configuration.centered = true;
    //configuration.container =  'app-property-details';
  }

  ngOnInit(): void {
  }
  view(): void {
    const modalRef = this.modalService.open(PieChartComponent);
    modalRef.result.then((result) => {
      if (result !== 'Close click') {
        console.log(result);
        //this.calendar.eventCategories.push(result);
      }
    }, error => {
      //console.log(error);
    });
  }
}
