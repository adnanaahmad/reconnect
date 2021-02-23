import {Component, Input, OnInit, EventEmitter, Output, OnChanges, SimpleChanges} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {HelperService} from '../../../../../../core/helper/helper.service';

@Component({
  selector: 'app-multi-family',
  templateUrl: './multi-family.component.html',
  styleUrls: ['./multi-family.component.scss']
})
export class MultiFamilyComponent implements OnInit, OnChanges {
  @Input() multiFamilyUnits;
  @Output() marketRentValues = new EventEmitter<any>();
  multiFamily: FormGroup;
  limit: number;
  units: Array<number>;
  constructor(private fb: FormBuilder,
              public helper: HelperService) { }

  ngOnInit(): void {
    this.initializeForm();
    this.setForm();
    this.setMarketRent();
    this.setUnitOccupying();
    //this.multiFamily.valueChanges.subscribe(res => console.log(res));
  }
  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
    // if (this.multiFamily) {
    //   this.setForm();
    // }
  }

  initializeForm(): void{
    this.multiFamily = this.fb.group({
      rent: this.fb.group({
        oneUnit: [null, Validators.required],
        twoUnit: [null, Validators.required],
        threeUnit: [null, Validators.required],
        fourUnit: [null, Validators.required]
      }),
      selectUnitOccupying: this.fb.group({
        oneUnit: [null],
        twoUnit: [null],
        threeUnit: [null],
        fourUnit: [null]
      }),
      useMarketRent: this.fb.group({
        oneUnit: [null],
        twoUnit: [null],
        threeUnit: [null],
        fourUnit: [null]
      }),
    });
  }
  setForm(): void{
    this.multiFamilyUnits = this.multiFamilyUnits.listings[0];
    this.limit = Number(this.multiFamilyUnits.xf_no_units) > 4 ? 4 : Number(this.multiFamilyUnits.xf_no_units);
    this.units = Array(this.limit).fill(0);
    this.setFormHelper('oneUnit', this.multiFamilyUnits.defaultMarketRent.xf_rent1);
    this.setFormHelper('twoUnit', this.multiFamilyUnits.defaultMarketRent.xf_rent2);
    this.setFormHelper('threeUnit', this.multiFamilyUnits.defaultMarketRent.xf_rent3);
    this.setFormHelper('fourUnit', this.multiFamilyUnits.defaultMarketRent.xf_rent4);
  }
  setFormHelper(unit, value): void{
    this.multiFamily.get(['rent', unit]).setValue(value);
    this.multiFamily.get(['useMarketRent', unit]).setValue(true);
    this.multiFamily.get(['rent', unit]).disable();
  }
  setMarketRent(): void{
    this.setMarketRentHelper('oneUnit', this.multiFamilyUnits.defaultMarketRent.xf_rent1);
    this.setMarketRentHelper('twoUnit', this.multiFamilyUnits.defaultMarketRent.xf_rent2);
    this.setMarketRentHelper('threeUnit', this.multiFamilyUnits.defaultMarketRent.xf_rent3);
    this.setMarketRentHelper('fourUnit', this.multiFamilyUnits.defaultMarketRent.xf_rent4);
  }
  setMarketRentHelper(unit, value): void{
    this.multiFamily.get(['useMarketRent', unit]).valueChanges.subscribe(res => {
      if (res){
        this.multiFamily.get(['rent', unit]).setValue(value);
        this.multiFamily.get(['selectUnitOccupying', unit]).setValue(false);
        this.multiFamily.get(['rent', unit]).disable();
      } else {
        this.multiFamily.get(['rent', unit]).enable();
      }
    });
  }
  setUnitOccupying(): void{
    this.setUnitOccupyingHelper('oneUnit');
    this.setUnitOccupyingHelper('twoUnit');
    this.setUnitOccupyingHelper('threeUnit');
    this.setUnitOccupyingHelper('fourUnit');
  }
  setUnitOccupyingHelper(unit): void{
    this.multiFamily.get(['selectUnitOccupying', unit]).valueChanges.subscribe(res => {
      if (res === true){
        this.multiFamily.get(['rent', unit]).setValue(0);
        this.multiFamily.get(['useMarketRent', unit]).setValue(false);
      }
    });
  }
  onSubmit(): void{
   const data = {};
   Object.values(this.multiFamily.getRawValue().rent).slice(0, this.limit).forEach((element, index) => {
     data['xf_rent' + (index + 1)] = element;
   });
   this.marketRentValues.emit(Object.keys(data).map(key => key + '=' + data[key]).join('&'));
   console.log(Object.keys(data).map(key => key + '=' + data[key]).join('&'));
  }
  trackByFn(index, item) {
    return index;  }
}
