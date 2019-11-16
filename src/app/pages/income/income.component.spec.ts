import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IncomeComponent } from './income.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { HttpClientModule } from '@angular/common/http';
import { IncomeService } from 'src/app/services/incomes/income.service';
import { Income } from 'src/app/models/income';
import { of } from 'rxjs';
import { ReactiveFormsModule } from '@angular/forms';

describe('IncomeComponent', () => {
  let component: IncomeComponent;
  let fixture: ComponentFixture<IncomeComponent>;
  let incomeService: IncomeService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [IncomeComponent],
      imports: [
        ModalModule.forRoot(),
        HttpClientModule,
        ReactiveFormsModule
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IncomeComponent);
    component = fixture.componentInstance;
    incomeService = TestBed.get(IncomeService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('getIncomeByUserid', () => {
    let expected: Income[];
    beforeEach(() => {
      expected = [
        {
          id: 1,
          incomeGroupID: 1,
          incomeNameGroupID: 'งานประจำ',
          amount: 100000,
          date: '1/31/2019'
        }
      ];
      spyOn(incomeService, 'getIncomeByUserId').and.returnValue(of(expected));
      component.ngOnInit();
      expect(component.incomes).toEqual(expected);
    });
  });

  describe('Create reactive form', () => {

    it('should set empty in date of form', () => {
      component.ngOnInit();
      expect(component.incomeForm.controls.date.value).toBe('');
    });

    it('should set empty income gruop id of form', () => {
      component.ngOnInit();
      expect(component.incomeForm.controls.incomeGroupID.value).toBe('');
    });

    it('should set empty in amount of form', () => {
      component.ngOnInit();
      expect(component.incomeForm.controls.amount.value).toBe('');
    });
  });
});
