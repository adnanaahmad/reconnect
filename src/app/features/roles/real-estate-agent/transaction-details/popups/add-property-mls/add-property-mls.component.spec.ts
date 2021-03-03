import {ComponentFixture, TestBed} from '@angular/core/testing';

import {AddPropertyMlsComponent} from './add-property-mls.component';

describe('AddPropertyMlsComponent', () => {
    let component: AddPropertyMlsComponent;
    let fixture: ComponentFixture<AddPropertyMlsComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [AddPropertyMlsComponent]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(AddPropertyMlsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
